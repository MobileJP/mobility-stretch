export const STRENGTH_LIBRARY = {
  zones: [
    {
      id: 'neck_shoulders',
      name: 'Neck & Shoulders',
      complaint: 'Forward head posture, weak deep neck flexors, poor shoulder stability',
      strength_goal: 'Build deep cervical flexor endurance and lower trapezius strength to hold the head in neutral and keep shoulders back',
      exercises: [
        {
          id: 'ns_str_001', name: 'Deep Neck Flexor Hold', type: 'strength', equipment: 'bodyweight',
          target: 'Deep cervical flexors, longus colli, longus capitis',
          why_it_matters: 'The deep neck flexors fatigue first in desk workers, causing the head to drift forward. This is the most targeted fix.',
          difficulty: {
            basic:     { instruction: 'Lie on your back, knees bent. Perform a chin tuck (draw chin straight back), then lift your head just 1-2cm off the floor — enough to slide a hand under. Hold. Lower slowly. Rest and repeat.', sets: 2, reps: 8,  hold_secs: 10, rest_secs: 60, load: 'bodyweight',            notes: 'The lift should be tiny. If your neck shakes or you feel strain in the front of the throat, lower slightly. Quality over height.' },
            immediate: { instruction: 'Lie on your back. Chin tuck, then lift head 2-3cm. Hold the position. Do not allow the chin to poke forward during the hold — if it does, lower slightly and reset.',                        sets: 3, reps: 8,  hold_secs: 15, rest_secs: 60, load: 'bodyweight',            notes: 'Watch for jaw tension or breath holding — both signal you are working too hard. Stay relaxed everywhere except the target area.' },
            advanced:  { instruction: 'Lie on your back. Chin tuck and lift head 2-3cm. Hold for the full duration. Between reps, lower head fully to the floor — do not rest it, just touch and lift again.',                    sets: 3, reps: 10, hold_secs: 20, rest_secs: 45, load: 'bodyweight',            notes: 'At this level you will feel genuine fatigue in the front of the neck. Stop the set if the chin begins to drift forward — that is form breakdown, not a target to push through.' },
          },
        },
        {
          id: 'ns_str_002', name: 'Band Pull-Apart', type: 'strength', equipment: 'resistance_band',
          target: 'Rear deltoid, rhomboids, middle and lower trapezius, rotator cuff',
          why_it_matters: 'Directly counteracts rounded shoulder posture by strengthening the muscles that hold the shoulder blades back and down.',
          difficulty: {
            basic:     { instruction: 'Hold a resistance band with both hands shoulder-width apart, arms extended in front at chest height. Pull the band apart by driving both hands out to the sides until the band touches your chest. Control the return. Keep elbows straight throughout.', sets: 2, reps: 12, hold_secs: 0, rest_secs: 45, load: 'light band',        notes: 'Use a light band. The movement is horizontal — do not let the arms drift up or down. Squeeze the shoulder blades at the end of each rep.' },
            immediate: { instruction: 'Hold band at chest height, arms extended. Pull apart until band touches chest, pause and hold the squeeze for 2 seconds. Control the return to full extension. Repeat.',                                                                                                                                                          sets: 3, reps: 15, hold_secs: 2, rest_secs: 45, load: 'medium band',       notes: 'The 2-second pause at full contraction is the key progression. Do not let the shoulder blades wing out on the return — keep them controlled.' },
            advanced:  { instruction: 'Hold band with hands close together (fists 15cm apart) to increase resistance. Perform pull-apart to chest, hold 2 seconds. Then, keeping the band taut, raise both arms overhead and lower back to chest height. That is one rep.',                                                                                     sets: 3, reps: 12, hold_secs: 2, rest_secs: 60, load: 'medium-heavy band', notes: 'The overhead arc dramatically increases demand on the lower trapezius. Only attempt once the basic and immediate versions feel completely controlled.' },
          },
        },
        {
          id: 'ns_str_003', name: 'Prone Y Raise', type: 'strength', equipment: 'bodyweight',
          target: 'Lower trapezius, serratus anterior, posterior deltoid',
          why_it_matters: 'The lower trapezius is almost always underactive in desk workers. Y raises are one of the highest-activation exercises for this muscle.',
          difficulty: {
            basic:     { instruction: 'Lie face down on the floor, arms extended above your head in a Y shape (thumbs pointing up). Squeeze your shoulder blades down and together, then lift both arms a few centimetres off the floor. Hold briefly, lower slowly. Keep your head in neutral — do not look up.', sets: 2, reps: 10, hold_secs: 2, rest_secs: 45, load: 'bodyweight',     notes: 'The movement is small. Do not try to lift high — focus on the squeeze, not the height.' },
            immediate: { instruction: 'Lie face down, arms in Y shape, thumbs up. Lift arms off the floor by driving the shoulder blades down and together. Hold at the top. Lower slowly over 3 counts. Repeat without resting arms on the floor between reps.',                                                                                               sets: 3, reps: 12, hold_secs: 3, rest_secs: 45, load: 'bodyweight',     notes: 'Not resting between reps increases time under tension significantly. If form breaks down, rest for 2 seconds between reps before removing that option.' },
            advanced:  { instruction: 'Lie face down, hold a very light dumbbell (2kg) in each hand, arms in Y shape, thumbs up. Lift arms using shoulder blade squeeze. Hold at top. Lower slowly. The weight should make the movement noticeably harder but not compromise the form.',                                                                      sets: 3, reps: 12, hold_secs: 3, rest_secs: 60, load: '2kg dumbbells',   notes: 'Even 2kg feels significant in this position. If you cannot maintain the Y shape and hold, drop back to bodyweight.' },
          },
        },
      ],
    },
    {
      id: 'chest_pectorals',
      name: 'Chest & Pectorals',
      complaint: 'Rounded shoulder posture, weak posterior chain to balance tight chest',
      strength_goal: 'Build posterior shoulder, rhomboid and rotator cuff strength to balance pectoral tightness and hold the chest open',
      exercises: [
        {
          id: 'cp_str_001', name: 'Dumbbell Row', type: 'strength', equipment: 'dumbbell',
          target: 'Rhomboids, mid trapezius, latissimus dorsi, rear deltoid, biceps',
          why_it_matters: 'The single best counterbalance to tight chest and rounded shoulders. Rows build the pulling strength that desk workers almost universally lack.',
          difficulty: {
            basic:     { instruction: 'Place your right hand and right knee on a chair for support. Hold a dumbbell in your left hand, arm hanging straight down. Row the dumbbell up toward your hip — lead with the elbow, not the hand. Lower slowly. Complete all reps on one side before switching.', sets: 2, reps: 10, hold_secs: 0, rest_secs: 60, load: '6kg dumbbell',  notes: 'Keep your back flat and parallel to the floor. Do not rotate the torso to assist the lift — all movement from the arm and shoulder blade.' },
            immediate: { instruction: 'Single-arm row as above. At the top of each rep, pause for 2 seconds and squeeze the shoulder blade in toward the spine. Lower over 3 slow counts. The slow lowering builds as much strength as the pull.',                                                                                                             sets: 3, reps: 12, hold_secs: 2, rest_secs: 60, load: '8kg dumbbell',  notes: 'The 3-count lowering (eccentric) is where most of the strength gain happens. Do not rush the descent.' },
            advanced:  { instruction: 'Stand in a hip-width stance, hinge forward 45 degrees from the hips (no chair support). Hold a dumbbell in each hand, arms hanging. Row both dumbbells simultaneously up to the hips, elbows driving back. Pause at the top, lower slowly.',                                                                          sets: 3, reps: 10, hold_secs: 2, rest_secs: 75, load: '10kg dumbbells', notes: 'The bilateral version without chair support requires core stability throughout. If your lower back rounds, reduce the weight or return to the supported single-arm version.' },
          },
        },
        {
          id: 'cp_str_002', name: 'Band Face Pull', type: 'strength', equipment: 'resistance_band',
          target: 'Rear deltoid, rotator cuff (external rotators), mid and lower trapezius',
          why_it_matters: 'Face pulls directly target the external rotators of the shoulder — the muscles most responsible for keeping the shoulder in a healthy position during all upper body movement.',
          difficulty: {
            basic:     { instruction: 'Anchor a resistance band at face height (around a door handle or looped over a door). Hold one end in each hand, arms extended. Pull the band toward your face by driving elbows out to the sides and back. Your hands should finish beside your ears. Squeeze at the end range, then slowly return.', sets: 2, reps: 12, hold_secs: 0, rest_secs: 45, load: 'light band',  notes: 'Elbows must stay high — level with or above the hands. If elbows drop, the rear deltoid drops out of the movement.' },
            immediate: { instruction: 'Face pull as above, with a 3-second hold at the end range — hands beside ears, elbows high and wide. Focus on pulling the shoulder blades together during the hold. Return slowly over 3 counts.',                                                                                                                    sets: 3, reps: 15, hold_secs: 3, rest_secs: 45, load: 'medium band',  notes: 'The pause is what separates this from a mobility exercise — you are building the strength to hold good posture, not just move through it.' },
            advanced:  { instruction: 'Face pull with band anchored at face height. Pull to ears. At the top, press both hands up overhead while keeping the band taut, then return to the face-pull position before extending arms forward. That is one rep.',                                                                                             sets: 3, reps: 12, hold_secs: 0, rest_secs: 60, load: 'medium band',  notes: 'The overhead press component challenges the lower trapezius and serratus under load. Move slowly through both phases.' },
          },
        },
        {
          id: 'cp_str_003', name: 'Push-Up', type: 'strength', equipment: 'bodyweight',
          target: 'Pectoralis major, anterior deltoid, triceps, serratus anterior',
          why_it_matters: 'Balanced pushing strength supports shoulder stability. The serratus anterior activation in a full push-up is particularly valuable for scapular control.',
          difficulty: {
            basic:     { instruction: 'Place hands on the edge of your desk or a sturdy chair, wider than shoulder-width, body in a straight line from head to heels. Lower your chest toward the surface, elbows at 45 degrees from the body (not flared out). Push back to the start.', sets: 2, reps: 10, hold_secs: 0, rest_secs: 60, load: 'bodyweight (incline)',  notes: 'The incline reduces load significantly — a good starting point. Keep the body rigid throughout. Do not let the hips sag or rise.' },
            immediate: { instruction: 'Floor push-up. Hands slightly wider than shoulder-width, body straight. Lower to 2cm above the floor over 3 counts. Pause briefly. Push up powerfully. At the top, push the floor away to protract the shoulder blades (round the upper back slightly). That is one rep.',                                           sets: 3, reps: 12, hold_secs: 0, rest_secs: 60, load: 'bodyweight',             notes: 'The protraction at the top activates serratus anterior — the muscle that keeps the shoulder blade flat against the ribcage. Do not skip this part.' },
            advanced:  { instruction: 'Place feet on a chair, hands on the floor — a decline push-up. Lower slowly over 3 counts, hold 1 second at the bottom, push up powerfully. The decline shifts emphasis to the upper chest and anterior deltoid.',                                                                                                 sets: 3, reps: 10, hold_secs: 1, rest_secs: 75, load: 'bodyweight (decline)', notes: 'Only use this variation once the floor push-up is fully controlled. The decline significantly increases load on the shoulder joint.' },
          },
        },
      ],
    },
    {
      id: 'wrists_forearms',
      name: 'Wrists & Forearms',
      complaint: 'Repetitive strain from keyboard and mouse, grip fatigue',
      strength_goal: 'Build balanced flexor and extensor strength to protect against repetitive strain and reduce fatigue during long typing sessions',
      exercises: [
        {
          id: 'wf_str_001', name: 'Wrist Curl', type: 'strength', equipment: 'dumbbell',
          target: 'Wrist flexors, forearm flexor group',
          why_it_matters: 'Typing primarily uses wrist flexors but rarely strengthens them through full range. This builds the endurance that prevents mid-afternoon forearm fatigue.',
          difficulty: {
            basic:     { instruction: 'Sit at the edge of your chair. Hold a light dumbbell in your right hand, forearm resting on your thigh with the wrist hanging off the knee, palm facing up. Curl the wrist upward as far as comfortable, then lower slowly all the way down. Complete all reps before switching arms.', sets: 2, reps: 15, hold_secs: 0, rest_secs: 45, load: '2kg dumbbell', notes: 'The full lowering phase is as important as the curl. Let the wrist drop all the way down — do not cut the range short.' },
            immediate: { instruction: 'Same position. Curl the wrist up, hold at the top for 2 seconds, lower slowly over 3 counts all the way to full extension. Repeat without swinging the forearm.',                                                                                                                                                  sets: 3, reps: 12, hold_secs: 2, rest_secs: 45, load: '4kg dumbbell', notes: 'The forearm must stay in contact with the thigh throughout — movement from the wrist only.' },
            advanced:  { instruction: 'Perform wrist curls standing, forearm braced against a wall at waist height. This removes the thigh support and requires more stabilisation. Curl, hold at top, lower slowly.',                                                                                                                                    sets: 3, reps: 15, hold_secs: 2, rest_secs: 45, load: '4kg dumbbell', notes: 'The wall brace is less stable than the thigh, increasing demand on the smaller stabiliser muscles of the forearm.' },
          },
        },
        {
          id: 'wf_str_002', name: 'Reverse Wrist Curl', type: 'strength', equipment: 'dumbbell',
          target: 'Wrist extensors, forearm extensor group',
          why_it_matters: 'Most people have much weaker extensors than flexors. This imbalance is a primary driver of repetitive strain injury at the wrist and elbow (tennis elbow).',
          difficulty: {
            basic:     { instruction: 'Sit at the edge of your chair. Hold a light dumbbell in your right hand, forearm resting on thigh, wrist hanging off the knee, palm facing down. Curl the wrist upward (toward the ceiling) as far as comfortable, then lower slowly. Complete all reps before switching.', sets: 2, reps: 15, hold_secs: 0, rest_secs: 45, load: '2kg dumbbell',     notes: 'Use a lighter weight than the wrist curl — extensors are significantly weaker than flexors for most people. Do not be surprised by this.' },
            immediate: { instruction: 'Reverse wrist curl as above. Hold at the top for 2 seconds, lower slowly. Both directions — full extension and full flexion — should be deliberate and controlled.',                                                                                                                                                  sets: 3, reps: 12, hold_secs: 2, rest_secs: 45, load: '2-4kg dumbbell', notes: 'Increase weight only when the hold at the top feels easy. Rushing the weight increase here is how forearm injuries happen.' },
            advanced:  { instruction: 'Perform both wrist curl and reverse wrist curl as a superset — 12 reps flexion, no rest, 12 reps extension. That is one set. Rest between sets. Both with the same dumbbell.',                                                                                                                                      sets: 3, reps: 12, hold_secs: 0, rest_secs: 60, load: '4kg dumbbell',   notes: 'The superset format increases time under tension and builds forearm endurance efficiently. Stop if you feel sharp pain — this is an area where fatigue and injury can feel similar.' },
          },
        },
        {
          id: 'wf_str_003', name: "Farmer's Carry", type: 'strength', equipment: 'dumbbell',
          target: 'Grip strength, forearm flexors, shoulder stabilisers, core',
          why_it_matters: "Grip endurance is the bottleneck for all forearm and wrist work. Farmer's carries build it more effectively than any isolated exercise.",
          difficulty: {
            basic:     { instruction: "Hold a dumbbell in each hand at your sides. Stand tall with shoulders back. Walk slowly across your available floor space, turn, and walk back. That is one length. Focus on keeping the shoulders level and not allowing the weight to pull them down.", sets: 3, reps: 1, hold_secs: 30, rest_secs: 60, load: '6kg dumbbells',      notes: 'In a small space, pace back and forth. 30 seconds of walking is the target per set.' },
            immediate: { instruction: "Farmer's carry as above, but hold a heavier dumbbell in one hand and a lighter one in the other (uneven load). The uneven load significantly increases core demand to keep the body upright. Switch which hand holds heavy on each set.",                                                                               sets: 3, reps: 1, hold_secs: 30, rest_secs: 60, load: '8kg + 6kg dumbbells', notes: 'Do not lean toward the heavy side — resist it actively. That resistance is the training stimulus.' },
            advanced:  { instruction: 'Single-arm farmer\'s carry — one dumbbell only. Hold it at your side. Walk, keeping the torso completely upright with zero lateral lean. Complete all time on one arm before switching.',                                                                                                                              sets: 3, reps: 1, hold_secs: 30, rest_secs: 60, load: '10kg dumbbell',     notes: 'The single-arm version is the most demanding for core anti-lateral flexion. This is a legitimate whole-body exercise masquerading as a grip drill.' },
          },
        },
      ],
    },
    {
      id: 'hands_fingers',
      name: 'Hands & Fingers',
      complaint: 'Grip fatigue, finger weakness from prolonged typing',
      strength_goal: 'Build grip endurance and finger extensor strength to balance the constant flexion load of typing and mouse use',
      exercises: [
        {
          id: 'hf_str_001', name: 'Grip Squeeze Hold', type: 'strength', equipment: 'dumbbell',
          target: 'Flexor digitorum, thenar and hypothenar muscles, forearm flexors',
          why_it_matters: 'Grip strength is one of the strongest predictors of overall upper body health and longevity. It degrades fastest with prolonged keyboard work.',
          difficulty: {
            basic:     { instruction: 'Hold a dumbbell in one hand, hanging at your side. Squeeze it as hard as you can — imagine trying to dent it. Hold the maximum squeeze, then fully relax your grip (but don\'t drop it). Repeat. Complete all reps before switching hands.',                                                                                    sets: 2, reps: 10, hold_secs: 5,  rest_secs: 45, load: '6kg dumbbell',   notes: 'The contrast between maximum squeeze and full relaxation is the training stimulus. Both phases matter equally.' },
            immediate: { instruction: 'Hold a dumbbell at your side. Squeeze maximally for 10 seconds, then perform 10 quick partial squeezes (pump grip). That is one rep. Switch hands and repeat.',                                                                                                                                                             sets: 3, reps: 5,  hold_secs: 10, rest_secs: 60, load: '8kg dumbbell',   notes: 'The pump squeezes after the hold build endurance on top of the strength. Your forearm will be burning — that is appropriate.' },
            advanced:  { instruction: 'Hold the handle of a kettlebell at its thickest point (around the bell, not the handle) in one hand, arm at your side. Squeeze and hold. The thick grip dramatically increases demand on the intrinsic hand muscles.',                                                                                                         sets: 3, reps: 6,  hold_secs: 10, rest_secs: 60, load: '8kg kettlebell', notes: 'Gripping the bell rather than the handle is a classic grip training technique. It is significantly harder than it looks.' },
          },
        },
        {
          id: 'hf_str_002', name: 'Band Finger Extension', type: 'strength', equipment: 'resistance_band',
          target: 'Finger extensors, dorsal interossei',
          why_it_matters: 'Typing flexes the fingers constantly but almost never extends them against resistance. This imbalance causes the finger and palm tension that desk workers experience daily.',
          difficulty: {
            basic:     { instruction: 'Loop a light resistance band around all four fingers of one hand (not the thumb), just above the first knuckle. Start with fingers curled together. Spread and extend all fingers against the band resistance. Hold briefly, then return. Complete all reps before switching hands.', sets: 2, reps: 15, hold_secs: 0, rest_secs: 30, load: 'light band',        notes: 'This may feel trivially easy at first. It will not after three sets. The extensors are very undertrained.' },
            immediate: { instruction: 'Band around fingers as above. Spread fingers fully against the band and hold for 3 seconds, then slowly return — do not snap back. That deliberate return is eccentric extensor training.',                                                                                                                                   sets: 3, reps: 12, hold_secs: 3, rest_secs: 30, load: 'light-medium band', notes: 'If the band is too easy for 3-second holds, double-loop it around the fingers for more resistance.' },
            advanced:  { instruction: 'Loop band around fingers. Perform full spreads as above. Then, keeping the band on, close fingers into a partial fist and re-extend — this mid-range variation targets the fingers at a different point in the range. Alternate full spreads and mid-range spreads within each set.',                                          sets: 3, reps: 20, hold_secs: 2, rest_secs: 45, load: 'medium band',      notes: 'The mid-range variation is harder than it sounds. You will feel it in the knuckle joints — that is the dorsal interossei activating.' },
          },
        },
        {
          id: 'hf_str_003', name: 'Kettlebell Bottoms-Up Hold', type: 'strength', equipment: 'kettlebell',
          target: 'Grip strength, wrist stabilisers, rotator cuff, forearm',
          why_it_matters: 'Holding a kettlebell upside down (bottom facing up) requires constant grip and wrist stabilisation — one of the most efficient hand and wrist strengthening exercises available.',
          difficulty: {
            basic:     { instruction: 'Hold the lightest kettlebell by the handle with one hand, arm bent at 90 degrees in front of you, bell pointing upward (bottoms-up position). Simply hold it still. The grip required to stop it tipping is the entire exercise.',                                                                                                             sets: 2, reps: 1, hold_secs: 20, rest_secs: 60, load: '6kg kettlebell', notes: 'This will feel unstable and shaky. That wobble is the point — your hand is constantly correcting. Keep breathing steadily throughout.' },
            immediate: { instruction: 'Bottoms-up hold at 90 degrees, as above. Slowly press the kettlebell from the 90-degree position up to full arm extension overhead, hold 2 seconds, then lower back to 90 degrees. That is one rep.',                                                                                                                                sets: 3, reps: 5, hold_secs: 2,  rest_secs: 75, load: '6kg kettlebell', notes: 'Press slowly — any wobble becomes amplified overhead. Do not attempt this if the static hold is not yet solid.' },
            advanced:  { instruction: 'Bottoms-up hold, walk slowly across your floor space while keeping the kettlebell stable overhead (arm fully extended). This is a bottoms-up overhead carry — requires grip, shoulder stability, and full-body coordination simultaneously.',                                                                                           sets: 3, reps: 1, hold_secs: 30, rest_secs: 90, load: '8kg kettlebell', notes: 'This is a high-skill exercise. Only attempt once the press version is fully controlled. The overhead carry is one of the most complete upper body stability exercises in existence.' },
          },
        },
      ],
    },
    {
      id: 'thoracic_spine',
      name: 'Thoracic Spine',
      complaint: 'Upper back stiffness and weakness from prolonged sitting',
      strength_goal: 'Strengthen the thoracic extensors and rotators to hold the upper back upright under the load of a forward-leaning head',
      exercises: [
        {
          id: 'ts_str_001', name: 'Superman Hold', type: 'strength', equipment: 'bodyweight',
          target: 'Thoracic extensors, lumbar erectors, gluteus maximus, posterior deltoid',
          why_it_matters: 'The entire posterior chain is underloaded in desk workers. Supermans rebuild the extensor strength needed to sit upright without effort.',
          difficulty: {
            basic:     { instruction: 'Lie face down on the floor, arms extended overhead. Lift just your arms off the floor by squeezing the shoulder blades together and activating the upper back. Keep your legs on the floor. Hold, then lower slowly.',                                                          sets: 2, reps: 10, hold_secs: 3, rest_secs: 45, load: 'bodyweight',    notes: 'Upper body only first — adding the legs simultaneously is significantly harder. Build the arms version confidently before progressing.' },
            immediate: { instruction: 'Lie face down. Simultaneously lift both arms and both legs off the floor by squeezing the glutes and upper back. Hold the position with the body forming a gentle arc. Lower slowly. Avoid holding your breath.',                                                              sets: 3, reps: 10, hold_secs: 3, rest_secs: 60, load: 'bodyweight',    notes: 'Keep the neck neutral — do not look up. The top of your head should point forward, not upward.' },
            advanced:  { instruction: 'Lie face down, hold a light dumbbell in each hand, arms extended overhead. Perform the full Superman lift — arms and legs — with the added weight. The dumbbells dramatically increase demand on the thoracic extensors.',                                                    sets: 3, reps: 10, hold_secs: 3, rest_secs: 60, load: '2kg dumbbells', notes: 'Even 2kg feels substantial in this position. The extended arm length creates significant leverage. Start lighter than you think necessary.' },
          },
        },
        {
          id: 'ts_str_002', name: 'Band Seated Row', type: 'strength', equipment: 'resistance_band',
          target: 'Mid trapezius, rhomboids, thoracic extensors, biceps',
          why_it_matters: 'Rowing movements are the primary driver of thoracic extension strength — the posture-holding capacity that desk workers lose first.',
          difficulty: {
            basic:     { instruction: 'Sit on the floor with legs extended. Loop a resistance band around the soles of both feet. Hold one end in each hand. Sit tall and row both hands toward your lower ribs by driving elbows back. Squeeze the shoulder blades at the end. Slowly return to full arm extension.',                                                    sets: 2, reps: 12, hold_secs: 0, rest_secs: 45, load: 'light band',        notes: 'Do not round the lower back to help the row. If you cannot sit upright with legs extended, sit on a folded towel or slightly bend the knees.' },
            immediate: { instruction: 'Seated band row as above. At the end of each row, hold the contraction for 3 seconds while driving the shoulder blades together and down. Return slowly over 3 counts. The eccentric return builds as much strength as the pull.',                                                 sets: 3, reps: 12, hold_secs: 3, rest_secs: 60, load: 'medium band',       notes: 'Squeeze down as well as together at the end range — the downward component specifically targets the lower trapezius.' },
            advanced:  { instruction: 'Seated band row as above. After the row, hold the contraction and perform 5 small additional squeezes — pull a little further each time. Then return slowly. This pulse technique dramatically increases end-range strength.',                                                   sets: 3, reps: 10, hold_secs: 0, rest_secs: 60, load: 'medium-heavy band', notes: 'The pulses should be small and controlled — 1-2cm of additional movement each time. Not a bounce.' },
          },
        },
        {
          id: 'ts_str_003', name: 'Kettlebell Halo', type: 'strength', equipment: 'kettlebell',
          target: 'Thoracic rotators, shoulder stabilisers, upper back, core',
          why_it_matters: 'The halo builds thoracic rotation strength and shoulder stability simultaneously — both areas of significant deficit in desk workers.',
          difficulty: {
            basic:     { instruction: 'Stand tall. Hold a kettlebell by the horns (the sides of the handle) at chest height, bell facing up. Slowly circle the kettlebell around your head — right, behind the head, left, and back to front. Keep the torso completely still. Only the arms move.',                                                              sets: 2, reps: 8,  hold_secs: 0, rest_secs: 45, load: '6kg kettlebell', notes: 'Move slowly — this is a controlled strength exercise, not a momentum exercise. Reverse direction every 4 reps.' },
            immediate: { instruction: 'Kettlebell halo as above, standing. Perform 6 circles in each direction. Between directions, pause with the kettlebell directly behind the head and hold for 3 seconds before reversing. The behind-head pause is the hardest point.',                                              sets: 3, reps: 12, hold_secs: 3, rest_secs: 60, load: '8kg kettlebell', notes: 'The 3-second hold behind the head puts the shoulder in its most vulnerable position under load. Control is everything here.' },
            advanced:  { instruction: 'Perform the kettlebell halo in a half-kneeling position — one knee on the floor, one foot forward. The reduced base of support forces the core and thoracic spine to stabilise actively. Complete all reps before switching the kneeling leg.',                                sets: 3, reps: 10, hold_secs: 0, rest_secs: 60, load: '8kg kettlebell', notes: 'Half-kneeling exposes and corrects asymmetries between sides. Note if one side is noticeably harder — that is the side that needs more attention.' },
          },
        },
      ],
    },
    {
      id: 'lower_back_hip_flexors',
      name: 'Lower Back & Hip Flexors',
      complaint: 'Lumbar weakness, core instability from prolonged sitting',
      strength_goal: 'Build core stability and glute strength to reduce lumbar load and hold the pelvis in a neutral position during sitting and standing',
      exercises: [
        {
          id: 'lb_str_001', name: 'Glute Bridge', type: 'strength', equipment: 'bodyweight',
          target: 'Gluteus maximus, hamstrings, core stabilisers',
          why_it_matters: 'Sitting inhibits the glutes neurally — they switch off. Glute bridges are the most direct way to reactivate them and reduce the lumbar load that causes lower back pain.',
          difficulty: {
            basic:     { instruction: 'Lie on your back, knees bent, feet flat on the floor hip-width apart. Drive your heels into the floor and lift your hips until your body forms a straight line from shoulders to knees. Squeeze the glutes hard at the top. Lower slowly. Do not use momentum.',                                                                              sets: 2, reps: 15, hold_secs: 2, rest_secs: 45, load: 'bodyweight',                  notes: 'The 2-second hold at the top is essential — it is long enough to verify you are squeezing the glutes and not just the lower back.' },
            immediate: { instruction: 'Glute bridge as above. Place a dumbbell or kettlebell across your hips (hold it in place with both hands). Perform the bridge with added load. Hold at the top for 3 seconds.',                                                                                                                                                          sets: 3, reps: 12, hold_secs: 3, rest_secs: 60, load: '12kg kettlebell across hips', notes: 'The weight should be heavy enough that 12 reps is genuinely challenging by the third set. Adjust accordingly.' },
            advanced:  { instruction: 'Single-leg glute bridge. Lie on your back, one knee bent, the other leg extended straight. Drive through the heel of the bent leg and lift the hips until the body forms a straight line. The extended leg stays in line with the torso — do not let it drop. Hold at top, lower slowly. Complete all reps before switching.', sets: 3, reps: 10, hold_secs: 3, rest_secs: 60, load: 'bodyweight',                  notes: 'Single-leg bridges reveal glute strength imbalances between sides. If one side drops significantly, add an extra set on the weaker side.' },
          },
        },
        {
          id: 'lb_str_002', name: 'Dead Bug', type: 'strength', equipment: 'bodyweight',
          target: 'Deep core stabilisers (transversus abdominis), lumbar multifidus, hip flexors',
          why_it_matters: 'The dead bug trains the core to stabilise the lumbar spine under opposing limb loads — exactly the demand placed on it during every waking moment. Preferred by physiotherapists over crunches for lower back health.',
          difficulty: {
            basic:     { instruction: 'Lie on your back. Lift both knees to 90 degrees (table-top position), arms pointing straight up to the ceiling. Press your lower back firmly into the floor. Slowly lower your right heel toward the floor while simultaneously lowering your left arm overhead. Stop before the lower back lifts off the floor. Return. Switch sides.', sets: 2, reps: 8,  hold_secs: 0, rest_secs: 45, load: 'bodyweight',    notes: 'The lower back pressing into the floor is the entire exercise. The moment it lifts, the movement is too large — reduce the range.' },
            immediate: { instruction: 'Dead bug as above with full arm and leg extension — heel reaches close to the floor, arm reaches back to hover above the floor. Hold the extended position for 3 seconds before returning. Keep breathing throughout.',                                                                                                                    sets: 3, reps: 10, hold_secs: 3, rest_secs: 60, load: 'bodyweight',    notes: 'Exhale as you extend — it makes maintaining the lower back contact significantly easier.' },
            advanced:  { instruction: 'Dead bug holding a light dumbbell in each hand. Perform full extensions with the added weight pulling the arms further overhead. The resistance makes the core demand substantially greater.',                                                                                                                                           sets: 3, reps: 10, hold_secs: 3, rest_secs: 60, load: '4kg dumbbells', notes: 'Even light dumbbells change this exercise significantly. If the lower back lifts at any point, reduce weight immediately.' },
          },
        },
        {
          id: 'lb_str_003', name: 'Kettlebell Deadlift', type: 'strength', equipment: 'kettlebell',
          target: 'Gluteus maximus, hamstrings, lumbar erectors, core',
          why_it_matters: 'The hip hinge is the most important movement pattern for lower back health. Desk workers lose the ability to hinge correctly, leading to lifting from the spine instead of the hips.',
          difficulty: {
            basic:     { instruction: 'Place a kettlebell between your feet, feet hip-width apart. Push your hips back (not down) and hinge forward, keeping your back straight, until your hands reach the handle. Grip it, brace your core, then drive through the floor to stand upright — leading with the hips, not the shoulders. Lower by hinging back, not squatting down.', sets: 3, reps: 10, hold_secs: 0, rest_secs: 60, load: '12kg kettlebell', notes: 'The hip hinge feels counterintuitive at first. Imagine a wall behind you that you are pushing your hips back toward. The spine stays long throughout — no rounding.' },
            immediate: { instruction: 'Kettlebell deadlift as above. At the top of each rep, pause and perform a maximum glute squeeze for 2 seconds before lowering. Lower slowly over 3 counts — feel the hamstrings loading as the weight descends.',                                                                                                                           sets: 3, reps: 10, hold_secs: 2, rest_secs: 75, load: '12kg kettlebell', notes: 'The slow lowering (eccentric) is where the hamstrings and glutes get the most training stimulus. Do not rush the descent.' },
            advanced:  { instruction: 'Single-leg Romanian deadlift. Hold one kettlebell in the opposite hand to the standing leg. Hinge forward on one leg, extending the other leg behind you for balance, until your torso is roughly parallel to the floor. Drive through the standing heel to return upright. Complete all reps before switching sides.',               sets: 3, reps: 8,  hold_secs: 0, rest_secs: 75, load: '8kg kettlebell',  notes: 'The single-leg version trains hip stability and glute strength simultaneously. Wobbling is expected at first — it reduces as strength and balance improve.' },
          },
        },
      ],
    },
    {
      id: 'glutes_piriformis',
      name: 'Glutes & Piriformis',
      complaint: 'Weak glutes from sitting, hip instability, sciatica risk',
      strength_goal: 'Build gluteus medius and maximus strength to stabilise the hip and reduce compression load on the piriformis and sciatic nerve',
      exercises: [
        {
          id: 'gp_str_001', name: 'Clamshell', type: 'strength', equipment: 'resistance_band',
          target: 'Gluteus medius, gluteus minimus, hip external rotators',
          why_it_matters: 'The gluteus medius is almost always weak in desk workers and is a primary contributor to hip and lower back pain. Clamshells are the most targeted fix.',
          difficulty: {
            basic:     { instruction: 'Lie on your side, hips stacked, knees bent at 90 degrees, feet together. Keeping your feet together, rotate your top knee upward as far as you can without your pelvis rolling back. Hold briefly at the top, then lower slowly. Complete all reps before switching sides.',                                                                             sets: 2, reps: 15, hold_secs: 2, rest_secs: 45, load: 'bodyweight',               notes: 'Place your top hand on your glute — you should feel it contracting at the top. If you feel it mostly in the hip flexor at the front, reduce the range of rotation.' },
            immediate: { instruction: 'Loop a resistance band just above the knees. Perform clamshells against the band resistance. Hold at the top for 3 seconds. Lower slowly — do not let the band snap the knee back down.',                                                                                                                                                          sets: 3, reps: 15, hold_secs: 3, rest_secs: 45, load: 'light band above knees', notes: 'The band resistance increases exponentially as the knee rises — the top of the movement is significantly harder than the bottom.' },
            advanced:  { instruction: 'Band above knees. Perform clamshell as above. At the top of each rep, hold the position and perform 5 small additional pulses — lift a tiny bit further each time, fighting the band — before lowering.',                                                                                                                                          sets: 3, reps: 10, hold_secs: 0, rest_secs: 60, load: 'medium band above knees', notes: 'The pulses at end range build strength specifically in the shortened position — where the glute medius is most needed for hip stability.' },
          },
        },
        {
          id: 'gp_str_002', name: 'Lateral Band Walk', type: 'strength', equipment: 'resistance_band',
          target: 'Gluteus medius, tensor fasciae latae, hip abductors',
          why_it_matters: 'The lateral walk trains the gluteus medius in a functional standing position — developing the strength needed to stabilise the hip during walking and stair climbing.',
          difficulty: {
            basic:     { instruction: 'Loop a resistance band just above the ankles. Stand with feet hip-width apart, slight bend in the knees. Step sideways with the right foot — wider than hip-width — then bring the left foot in to hip-width again. Take 10 steps right, then 10 steps left. That is one set.', sets: 2, reps: 1, hold_secs: 0, rest_secs: 45, load: 'light band at ankles',  notes: 'Keep the torso upright — do not lean to the stepping side. The band should always remain taut — feet never come close enough to slacken it.' },
            immediate: { instruction: 'Band at ankles, slight knee bend. Walk laterally with a deliberate pause on each step — when the stepping foot lands, pause for 2 seconds in the wide stance before bringing the trailing foot in. 10 steps each direction.',                                                   sets: 3, reps: 1, hold_secs: 2, rest_secs: 60, load: 'medium band at ankles', notes: 'The pause in the wide stance means you are momentarily standing on one leg with band tension — this is the peak demand for the gluteus medius.' },
            advanced:  { instruction: 'Band at ankles. Lateral walk as above, but add a squat at the wide stance — step out, squat, stand, step in. That is the full movement. 8 squats each direction per set.',                                                                                                    sets: 3, reps: 8, hold_secs: 0, rest_secs: 75, load: 'medium band at ankles', notes: 'The squat component adds significant quad and glute max demand on top of the medius work. Control the descent and drive through both heels on the way up.' },
          },
        },
        {
          id: 'gp_str_003', name: 'Kettlebell Swing', type: 'strength', equipment: 'kettlebell',
          target: 'Gluteus maximus, hamstrings, core, posterior chain',
          why_it_matters: 'The swing is the most explosive glute-dominant exercise available. It teaches the hip to generate power — the movement pattern most suppressed by sitting.',
          difficulty: {
            basic:     { instruction: 'Stand with feet slightly wider than hip-width, kettlebell on the floor in front of you. Hinge at the hips and grip the handle. Hike the kettlebell back between your legs like a centre in American football. Drive your hips forward explosively — the kettlebell floats up to chest height from the hip drive, not from your arms. Let it swing back between the legs and repeat.', sets: 3, reps: 10, hold_secs: 0, rest_secs: 75, load: '8kg kettlebell',  notes: 'The swing is a hip hinge with power — not a squat, not a shoulder raise. The arms are ropes. All power from the hips. Learn the pattern before adding reps.' },
            immediate: { instruction: 'Two-handed swing as above with a heavier kettlebell. Focus on a hard glute squeeze at the top of each swing — the point where the body is fully upright and the kettlebell is at chest height. That squeeze is where the power and the training stimulus meet.',                                                                                                                  sets: 4, reps: 12, hold_secs: 0, rest_secs: 75, load: '12kg kettlebell', notes: 'At 12kg for 12 reps across 4 sets, you will feel cardiovascular demand as well as muscular. That is appropriate — the swing is a full-body conditioning exercise.' },
            advanced:  { instruction: 'Single-arm swing. Hold the kettlebell in one hand only. Perform swings as above — the unilateral load dramatically increases anti-rotation core demand and challenges the shoulder stability of the swinging arm. Complete all reps before switching arms.',                                                                                                                     sets: 4, reps: 10, hold_secs: 0, rest_secs: 90, load: '12kg kettlebell', notes: 'Do not allow the torso to rotate toward the swinging arm. Resist that rotation actively — it is the core training component of this variation.' },
          },
        },
      ],
    },
    {
      id: 'calves_ankles',
      name: 'Calves & Ankles',
      complaint: 'Weak calves from static sitting, poor ankle stability and circulation',
      strength_goal: 'Build calf strength and ankle stability to improve circulation, reduce fatigue and develop the lower leg resilience that prolonged sitting erodes',
      exercises: [
        {
          id: 'ca_str_001', name: 'Single-Leg Calf Raise', type: 'strength', equipment: 'bodyweight',
          target: 'Gastrocnemius, soleus, tibialis posterior',
          why_it_matters: "The calf muscles are the body's venous pump — they push blood back up from the feet to the heart. Desk workers switch this off for hours at a time. Calf raises restore it and build lower leg resilience.",
          difficulty: {
            basic:     { instruction: 'Stand behind your chair, holding the backrest lightly for balance. Shift weight onto your right foot. Rise slowly onto the toes of the right foot as high as possible. Hold at the top. Lower slowly over 3 counts. Complete all reps before switching.', sets: 2, reps: 12, hold_secs: 2, rest_secs: 45, load: 'bodyweight',    notes: 'Hold the chair only for balance — do not push down on it to assist the raise. All load through the working leg.' },
            immediate: { instruction: 'Single-leg calf raise without chair support — arms out to the sides for balance. Rise, hold at the top, lower slowly. The balance challenge is significant and trains ankle proprioception alongside calf strength.',                                       sets: 3, reps: 15, hold_secs: 2, rest_secs: 45, load: 'bodyweight',    notes: 'If balance is difficult, place one finger on the wall. Gradually reduce the contact as balance improves.' },
            advanced:  { instruction: 'Single-leg calf raise while holding a dumbbell in the same-side hand as the working leg. The added load and contralateral balance demand make this a comprehensive ankle and calf exercise.',                                                              sets: 3, reps: 12, hold_secs: 2, rest_secs: 60, load: '8kg dumbbell',  notes: 'Holding the weight on the same side as the working leg (ipsilateral) is harder for balance than holding it on the opposite side. Start without and add the weight once the movement is solid.' },
          },
        },
        {
          id: 'ca_str_002', name: 'Tibialis Anterior Raise', type: 'strength', equipment: 'bodyweight',
          target: 'Tibialis anterior, ankle dorsiflexors',
          why_it_matters: 'The tibialis anterior (shin muscle) is almost never trained. It is the muscle that lifts the foot — essential for normal gait and ankle stability. Weakness here contributes to ankle rolling and shin pain.',
          difficulty: {
            basic:     { instruction: 'Sit at the edge of your chair, heels on the floor. Lift the front of both feet (toes toward the ceiling) as high as possible, keeping heels down. Hold at the top, then lower slowly. You should feel this in the shins.',                                                                                  sets: 2, reps: 20, hold_secs: 2, rest_secs: 30, load: 'bodyweight', notes: 'This is one of the simplest exercises you can do at your desk. The shin burn confirms the right muscle is working.' },
            immediate: { instruction: 'Stand with your back against the wall, heels about 30cm from the wall. Lift the front of both feet simultaneously — toes up as high as possible — hold, then lower slowly. Complete all reps without resting the feet on the floor between reps.',                                                         sets: 3, reps: 20, hold_secs: 2, rest_secs: 45, load: 'bodyweight', notes: 'Not resting between reps builds the endurance component. The tibialis anterior fatigues quickly — that is expected and appropriate.' },
            advanced:  { instruction: 'Stand. Loop a resistance band around one foot and anchor it to a fixed object in front of you. Lift the front of that foot against the band resistance. Complete all reps before switching feet.',                                                            sets: 3, reps: 15, hold_secs: 2, rest_secs: 45, load: 'light band at foot', notes: 'The band resistance makes this considerably harder than it looks. The tibialis anterior is not used to being loaded — progress gradually.' },
          },
        },
        {
          id: 'ca_str_003', name: 'Kettlebell Single-Leg Deadlift', type: 'strength', equipment: 'kettlebell',
          target: 'Ankle stabilisers, gluteus medius, hamstrings, calf complex',
          why_it_matters: 'Balance and ankle proprioception deteriorate rapidly with desk work. The single-leg deadlift restores both while building lower body strength from foot to hip.',
          difficulty: {
            basic:     { instruction: 'Stand near a wall for support. Balance on your right foot. Hinge forward at the hip while your left leg extends behind you. Reach your right hand toward the floor (no weight). Drive through the right heel to return upright. Touch the wall only if needed. Complete all reps before switching.', sets: 2, reps: 8, hold_secs: 0, rest_secs: 60, load: 'bodyweight',    notes: 'Focus on the ankle of the standing leg — it will work hard to stabilise. That instability is the point.' },
            immediate: { instruction: 'Single-leg deadlift holding a light kettlebell in the opposite hand to the standing leg. Hinge forward, lower the kettlebell toward the floor, drive back to standing. The kettlebell adds load and increases the balance demand.',                                                                   sets: 3, reps: 8, hold_secs: 0, rest_secs: 60, load: '6kg kettlebell', notes: 'Keep the standing knee soft — not locked. A completely straight knee reduces proprioceptive feedback from the ankle.' },
            advanced:  { instruction: 'Single-leg deadlift holding a heavier kettlebell. At the bottom of each rep, pause for 2 seconds — this is the most unstable position and the pause significantly increases both balance and strength demand.',                                             sets: 3, reps: 8, hold_secs: 2, rest_secs: 75, load: '8kg kettlebell', notes: 'At this level, small imperfections in ankle stability become very visible. Note which side is less stable and add an extra set on that side.' },
          },
        },
      ],
    },
    {
      id: 'eyes',
      name: 'Eyes',
      complaint: 'Weak extraocular muscles, poor convergence, reduced accommodative speed',
      strength_goal: 'Build extraocular muscle endurance and convergence strength to reduce digital eye strain and maintain sharp focus across a working day',
      exercises: [
        {
          id: 'ey_str_001', name: 'Convergence Push-Up', type: 'strength', equipment: 'bodyweight',
          target: 'Medial rectus muscles, convergence mechanism, ciliary muscle',
          why_it_matters: 'Convergence insufficiency — the inability to keep both eyes focused on a near object — is extremely common in screen workers and causes headaches, blurred vision and eye fatigue. This exercise directly strengthens it.',
          difficulty: {
            basic:     { instruction: 'Hold your index finger at arm\'s length in front of your nose. Focus both eyes on the fingertip until it appears single and clear. Slowly move the finger toward your nose while keeping both eyes converged on it. Stop the moment you see double (two fingers). Hold at that point, then slowly move the finger back to arm\'s length. Repeat.', sets: 2, reps: 10, hold_secs: 3, rest_secs: 30, load: 'bodyweight', notes: 'The point at which you see double is your current convergence limit. With training, this point moves closer to the nose over weeks.' },
            immediate: { instruction: 'Convergence push-up as above. When you reach the double-vision point, hold for 5 seconds while actively trying to fuse the image back to single. Then move the finger 1cm closer and repeat the hold. Move back to arm\'s length to complete one rep.',                                                                                         sets: 3, reps: 8,  hold_secs: 5, rest_secs: 30, load: 'bodyweight', notes: 'The active attempt to fuse at the double-vision point is the strength component. It is effortful and you will feel it as eye fatigue — that is appropriate.' },
            advanced:  { instruction: 'Convergence push-up with a pen or pencil — the finer tip gives more precise focus than a finger. Move from arm\'s length to 5cm from the nose and back in one slow, controlled arc. Hold at the near point for 5 seconds. Complete reps without blinking at the near point.',                                                              sets: 3, reps: 10, hold_secs: 5, rest_secs: 45, load: 'bodyweight', notes: 'Not blinking at the near-point hold adds a significant stability demand. Blink freely between reps.' },
          },
        },
        {
          id: 'ey_str_002', name: 'Accommodative Rock', type: 'strength', equipment: 'bodyweight',
          target: 'Ciliary muscle, lens accommodation mechanism',
          why_it_matters: 'The ciliary muscle controls lens focus. Screen work keeps it locked at near distance for hours, reducing its speed and range. Accommodative rocking trains the full range — near to far — like interval training for the focusing system.',
          difficulty: {
            basic:     { instruction: 'Hold a finger or pen 30cm from your face. Focus clearly on it for 3 seconds — the background should blur. Then shift focus to the furthest point in the room for 3 seconds — the finger should blur. That shift is one rep. Keep the head still throughout.', sets: 2, reps: 10, hold_secs: 3, rest_secs: 30, load: 'bodyweight', notes: 'Allow the blur to happen — do not squint to clear it. Squinting is compensation. The blur means the lens is changing shape, which is the exercise.' },
            immediate: { instruction: 'Near-far shift as above, but increase the hold at each point to 5 seconds — long enough for the focus to fully settle and clear before shifting. Near 5 seconds, far 5 seconds. That is one rep.',                                                            sets: 3, reps: 10, hold_secs: 5, rest_secs: 30, load: 'bodyweight', notes: 'The clarity of focus at each point before shifting is the measure of progress. Over weeks, focus settles faster — that is the ciliary muscle getting stronger.' },
            advanced:  { instruction: 'Three-distance accommodative rock. Near (30cm), mid (2m), far (across the room). Focus fully at each point for 5 seconds, in sequence. Near to mid to far to mid to near is one rep. Then add a blink at each transition to reset.',                    sets: 3, reps: 8,  hold_secs: 5, rest_secs: 45, load: 'bodyweight', notes: 'The mid-distance point — around 2 metres — is where the ciliary muscle is working hardest. Adding it between near and far covers the complete accommodative range.' },
          },
        },
        {
          id: 'ey_str_003', name: 'Saccadic Precision Drill', type: 'strength', equipment: 'bodyweight',
          target: 'All extraocular muscles, saccadic movement control, visual processing speed',
          why_it_matters: 'Screen work uses smooth pursuit tracking (following moving objects) but almost never trains fast, precise saccadic jumps (reading, switching attention). This imbalance causes visual fatigue and slow focus switching.',
          difficulty: {
            basic:     { instruction: 'Place two fingers from each hand at the edges of your peripheral vision — one finger far left, one far right, each at arm\'s length. Keep your head completely still. Quickly snap your gaze from the left finger to the right finger and back. 20 jumps, then rest. Keep the movement sharp and accurate — land on the fingertip, not near it.', sets: 2, reps: 20, hold_secs: 0, rest_secs: 30, load: 'bodyweight', notes: 'Speed and precision together is the goal. Slow and accurate first — then increase speed while maintaining accuracy.' },
            immediate: { instruction: 'Four-point saccadic drill. Place fingers at four positions — far left, far right, top left, bottom right. Call out or mentally sequence the positions and jump your gaze precisely to each in sequence. 5 full sequences is one set.',                                                                                                          sets: 3, reps: 5,  hold_secs: 0, rest_secs: 45, load: 'bodyweight', notes: 'Varying the sequence randomly (rather than always going in the same order) increases the demand on visual processing speed and attention.' },
            advanced:  { instruction: 'Saccadic drill with near-far component. Hold one finger at 30cm, look at a point on the far wall. Jump gaze from near finger to far point rapidly and precisely — the focus must clear at each point before jumping. 30 jumps is one set.',                                                                                                    sets: 3, reps: 30, hold_secs: 0, rest_secs: 60, load: 'bodyweight', notes: 'This combines saccadic speed with accommodative demand — the most complete visual training drill available without equipment. It will cause genuine eye fatigue if done correctly. Rest fully between sets.' },
          },
        },
      ],
    },
  ],
}

export const EQUIPMENT_LABELS = {
  bodyweight:       'No equipment',
  resistance_band:  'Resistance band',
  dumbbell:         'Dumbbells',
  kettlebell:       'Kettlebell',
}
