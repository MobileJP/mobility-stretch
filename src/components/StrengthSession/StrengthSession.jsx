import { useState, useRef } from 'react'
import StrengthExerciseCard from '../StrengthExerciseCard/StrengthExerciseCard'
import RestTimer from '../RestTimer/RestTimer'
import styles from './StrengthSession.module.css'

function fmtDate(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
}

export default function StrengthSession({ exercises, difficulty, zoneName, onComplete, onGoHome }) {
  const [exIdx,    setExIdx]    = useState(0)
  const [set,      setSet]      = useState(1)
  const [phase,    setPhase]    = useState('exercise')  // 'exercise' | 'rest'
  const startTime              = useRef(Date.now())
  const [completions, setCompletions] = useState({}) // exerciseId → { done: 0, skipped: 0 }

  const current     = exercises[exIdx]
  const totalSets   = exercises.reduce((s, ex) => s + ex.sets, 0)
  const setsBeforeThis = exercises.slice(0, exIdx).reduce((s, ex) => s + ex.sets, 0)
  const globalSet   = setsBeforeThis + set

  const recordSet = (exerciseId, skipped = false) => {
    setCompletions(prev => {
      const cur = prev[exerciseId] || { done: 0, skipped: 0 }
      return {
        ...prev,
        [exerciseId]: {
          done:    cur.done    + (skipped ? 0 : 1),
          skipped: cur.skipped + (skipped ? 1 : 0),
        },
      }
    })
  }

  const advanceAfterRest = () => {
    const nextSet = set + 1
    if (nextSet > current.sets) {
      nextExercise()
    } else {
      setSet(nextSet)
      setPhase('exercise')
    }
  }

  const nextExercise = () => {
    if (exIdx + 1 >= exercises.length) {
      finish()
    } else {
      setExIdx(i => i + 1)
      setSet(1)
      setPhase('exercise')
    }
  }

  const handleSetComplete = (skipped = false) => {
    recordSet(current.id, skipped)
    if (set < current.sets) {
      setPhase('rest')
    } else {
      nextExercise()
    }
  }

  const handleSkipExercise = () => {
    const remaining = current.sets - set + 1
    for (let i = 0; i < remaining; i++) recordSet(current.id, true)
    nextExercise()
  }

  const finish = () => {
    const durationSecs = Math.round((Date.now() - startTime.current) / 1000)
    const completedIds = exercises.filter(ex => (completions[ex.id]?.done || 0) > 0).map(ex => ex.id)
    const skippedIds   = exercises.filter(ex => {
      const c = completions[ex.id]
      return c && c.skipped > 0 && (c.done || 0) === 0
    }).map(ex => ex.id)

    const setCompletionsArr = exercises.map(ex => ({
      exerciseId:    ex.id,
      exerciseName:  ex.name,
      zone:          ex.zoneId,
      equipment:     ex.equipment,
      setsCompleted: completions[ex.id]?.done    || 0,
      setsSkipped:   completions[ex.id]?.skipped || 0,
      setsTotal:     ex.sets,
      completed:     (completions[ex.id]?.done || 0) === ex.sets,
    }))

    const setsCompleted = setCompletionsArr.reduce((s, e) => s + e.setsCompleted, 0)
    const setsTotalNum  = exercises.reduce((s, ex) => s + ex.sets, 0)

    onComplete({
      zoneName,
      difficulty,
      exercises,
      completedExerciseIds:  completedIds,
      skippedExerciseIds:    skippedIds,
      setCompletions:        setCompletionsArr,
      setsCompleted,
      setsTotal:             setsTotalNum,
      durationSecs,
      date:                  fmtDate(new Date()),
    })
  }

  const nextExLabel = phase === 'rest'
    ? (set < current.sets
        ? `Set ${set + 1} of ${current.sets} — ${current.name}`
        : (exIdx + 1 < exercises.length ? exercises[exIdx + 1].name : 'Last set'))
    : ''

  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.zonePill}>{zoneName}</span>
          <span className={styles.progress}>
            Ex {exIdx + 1}/{exercises.length} · Set {globalSet}/{totalSets}
          </span>
        </div>
        <button className={styles.btnEnd} onClick={finish}>End session</button>
      </div>

      <div className={styles.card}>
        {phase === 'exercise' ? (
          <>
            <StrengthExerciseCard
              key={`${current.id}-${set}`}
              exercise={current}
              currentSet={set}
              totalSets={current.sets}
              onSetComplete={() => handleSetComplete(false)}
            />
            <div className={styles.skipRow}>
              <button className={styles.btnSkip} onClick={() => handleSetComplete(true)}>Skip set</button>
              <button className={styles.btnSkip} onClick={handleSkipExercise}>Skip exercise</button>
            </div>
          </>
        ) : (
          <RestTimer
            rest_secs={current.rest_secs}
            nextLabel={nextExLabel}
            onComplete={advanceAfterRest}
            onSkip={advanceAfterRest}
          />
        )}
      </div>
    </div>
  )
}
