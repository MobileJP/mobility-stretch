export const STRETCH_LIBRARY = {
  version: '1.0',
  zones: [
    {
      id: 'neck_shoulders', name: 'Neck & Shoulders',
      complaint: 'Screen strain, forward head posture',
      stretches: [
        { id: 'ns_001', name: 'Chin Tuck', target: 'Deep cervical flexors, upper cervical spine',
          difficulty: {
            basic:      { instruction: 'Sit tall in your chair. Gently draw your chin straight back — as if making a double chin — without tilting your head up or down. Hold, then release.', hold_secs: 20, reps: 5, notes: 'Keep shoulders relaxed and down throughout.' },
            immediate:  { instruction: 'Sit or stand tall. Draw your chin straight back firmly, feeling a stretch at the base of your skull. Hold, then slowly release. Repeat.', hold_secs: 30, reps: 5, notes: 'Imagine a string pulling the crown of your head toward the ceiling as you tuck.' },
            advanced:   { instruction: 'Stand tall. Draw your chin back firmly, then add a gentle nod — tucking chin first, then slowly lowering your gaze toward the floor. Hold the end position, then slowly reverse.', hold_secs: 45, reps: 5, notes: 'The added nod deepens the stretch into the upper cervical extensors. Move slowly.' },
          },
        },
        { id: 'ns_002', name: 'Neck Side Stretch', target: 'Upper trapezius, scalenes, sternocleidomastoid',
          difficulty: {
            basic:      { instruction: 'Sit tall. Slowly tilt your right ear toward your right shoulder until you feel a gentle stretch on the left side of your neck. Hold, then return to centre. Repeat on the left.', hold_secs: 20, reps: 3, notes: 'Do not force the stretch. Let gravity do the work.' },
            immediate:  { instruction: 'Sit tall. Tilt your right ear toward your right shoulder. Place your right hand lightly on the left side of your head and apply gentle downward pressure to deepen the stretch. Hold, then switch sides.', hold_secs: 30, reps: 3, notes: 'Use minimal hand pressure — just enough to feel an increase in the stretch.' },
            advanced:   { instruction: 'Sit tall. Tilt right ear toward right shoulder. Reach your left arm down and out at 45 degrees, palm facing down, and actively press it toward the floor while holding the neck tilt. Hold, then switch sides.', hold_secs: 45, reps: 3, notes: 'The arm depression increases stretch intensity through the full scalene and trap line.' },
          },
        },
        { id: 'ns_003', name: 'Shoulder Rolls', target: 'Upper trapezius, levator scapulae, deltoids',
          difficulty: {
            basic:      { instruction: 'Sit tall with arms relaxed at your sides. Slowly roll both shoulders forward in a large circle — up, back, down, and forward. Complete 5 rolls, then reverse direction.', hold_secs: 0, reps: 4, notes: 'Move slowly and breathe throughout. No holding required — continuous movement.' },
            immediate:  { instruction: 'Stand tall. Roll both shoulders in slow, large circles — exaggerating the backward phase by squeezing the shoulder blades together at the top. Do 5 forward, 5 backward.', hold_secs: 0, reps: 6, notes: 'Pause briefly at the squeeze point on each backward roll.' },
            advanced:   { instruction: 'Stand tall with arms extended out to the sides at shoulder height. Make slow backward circles with your entire arms, starting small and gradually increasing to full range. 10 reps, then reverse.', hold_secs: 0, reps: 8, notes: 'Keep arms fully extended throughout. You will feel this in the rotator cuff and rear deltoid.' },
          },
        },
        { id: 'ns_004', name: 'Upper Trap Stretch', target: 'Upper trapezius, levator scapulae',
          difficulty: {
            basic:      { instruction: 'Sit tall. Look straight ahead. Slowly rotate your head to look over your right shoulder as far as comfortable, hold briefly, then rotate to the left. Alternate sides.', hold_secs: 15, reps: 4, notes: 'Keep chin level throughout. Do not tilt.' },
            immediate:  { instruction: 'Sit tall. Turn your head to the right and slightly down, as if looking into your right armpit. Hold the stretch, then return and repeat on the left.', hold_secs: 30, reps: 3, notes: 'The diagonal angle targets the levator scapulae specifically.' },
            advanced:   { instruction: 'Sit tall. Turn your head right and diagonally down. Place your right hand on the back-left of your head and apply gentle pressure to deepen the stretch. Hold, release slowly, and switch sides.', hold_secs: 45, reps: 3, notes: 'Apply very light pressure — this area responds to gentle sustained stretch, not force.' },
          },
        },
      ],
    },
    {
      id: 'chest_pectorals', name: 'Chest & Pectorals',
      complaint: 'Rounded shoulder posture, tight chest from hunching',
      stretches: [
        { id: 'cp_001', name: 'Seated Chest Opener', target: 'Pectoralis major, anterior deltoid',
          difficulty: {
            basic:      { instruction: 'Sit tall at the edge of your chair. Clasp your hands behind your back at the base of your spine. Gently squeeze your shoulder blades together and lift your chest. Hold.', hold_secs: 20, reps: 3, notes: 'Keep your chin tucked and neck long. Do not arch your lower back.' },
            immediate:  { instruction: 'Sit tall. Clasp your hands behind your back. Squeeze shoulder blades firmly together, lift your chest, and gently press your clasped hands downward and back. Hold.', hold_secs: 30, reps: 3, notes: 'The downward press of the hands intensifies the stretch across the chest.' },
            advanced:   { instruction: 'Stand. Clasp hands behind your back, squeeze shoulder blades, then hinge forward from the hips to about 45 degrees while raising the clasped hands up behind you. Hold, then slowly return upright.', hold_secs: 45, reps: 3, notes: 'The forward hinge dramatically increases pectoral stretch. Move slowly into the position.' },
          },
        },
        { id: 'cp_002', name: 'Doorframe Chest Stretch', target: 'Pectoralis major and minor, anterior deltoid',
          difficulty: {
            basic:      { instruction: 'Stand in a doorframe. Place both forearms on the doorframe at shoulder height, elbows at 90 degrees. Lean gently forward through the gap until you feel a stretch across the chest. Hold.', hold_secs: 20, reps: 3, notes: 'Only lean as far as comfortable. Keep your core engaged.' },
            immediate:  { instruction: 'Stand in a doorframe. Forearms on the frame, elbows at 90 degrees. Lean forward firmly through the gap, stepping one foot through to increase the lean. Hold, then step back.', hold_secs: 30, reps: 3, notes: 'Step foot position forward to deepen — not further leaning of the trunk.' },
            advanced:   { instruction: 'Stand in a doorframe. Place one hand high on the frame (above shoulder height), lean through, and rotate your torso away from the raised arm. Hold, then switch arms.', hold_secs: 45, reps: 3, notes: 'The rotation and high arm position targets pec minor — the deeper and often tighter layer.' },
          },
        },
        { id: 'cp_003', name: 'Shoulder Blade Squeeze', target: 'Rhomboids, mid-trapezius, pectorals (through release)',
          difficulty: {
            basic:      { instruction: 'Sit or stand tall. Draw both shoulder blades toward each other and hold. Release fully, letting shoulders round forward briefly. Repeat.', hold_secs: 10, reps: 5, notes: 'The contrast between squeeze and release is the key — both phases matter.' },
            immediate:  { instruction: 'Stand tall with arms at your sides. Squeeze shoulder blades together firmly and simultaneously draw them downward (away from ears). Hold, then release.', hold_secs: 20, reps: 8, notes: 'Down and together — avoid shrugging the shoulders up during the squeeze.' },
            advanced:   { instruction: 'Stand with arms extended out to the sides at shoulder height, thumbs pointing up. Squeeze shoulder blades together and pull arms slightly behind the body plane. Hold.', hold_secs: 30, reps: 8, notes: 'The extended arm position increases demand on the mid-back and posterior rotator cuff.' },
          },
        },
      ],
    },
    {
      id: 'wrists_forearms', name: 'Wrists & Forearms',
      complaint: 'Keyboard and mouse fatigue, repetitive strain',
      stretches: [
        { id: 'wf_001', name: 'Wrist Flexor Stretch', target: 'Wrist flexors, forearm flexor group',
          difficulty: {
            basic:      { instruction: 'Extend your right arm in front of you, palm facing up. With your left hand, gently press the fingers of your right hand downward toward the floor. Hold, then switch arms.', hold_secs: 20, reps: 3, notes: 'Keep the elbow straight but not locked. Reduce pressure if you feel sharp discomfort.' },
            immediate:  { instruction: 'Extend your right arm forward, palm up, fingers pointing down. Use your left hand to draw fingers back toward your body until you feel a strong stretch in the forearm. Hold, then switch.', hold_secs: 30, reps: 3, notes: 'Rotate the extended arm slightly outward for a deeper stretch along the inner forearm.' },
            advanced:   { instruction: 'Place both palms flat on your desk, fingers pointing toward you. Slowly lean back from the desk, keeping palms flat, until you feel a deep stretch in both forearms simultaneously. Hold.', hold_secs: 45, reps: 3, notes: 'Lean back gradually. Stop if you feel any wrist joint pain — this is a forearm stretch, not a joint compression.' },
          },
        },
        { id: 'wf_002', name: 'Wrist Extensor Stretch', target: 'Wrist extensors, forearm extensor group',
          difficulty: {
            basic:      { instruction: 'Extend your right arm in front of you, palm facing down, fingers pointing toward the floor. With your left hand, gently press the back of your right hand downward. Hold, then switch.', hold_secs: 20, reps: 3, notes: 'This is the companion to the flexor stretch — both directions need equal attention.' },
            immediate:  { instruction: 'Extend your right arm, palm down. Cross your left hand over and press the back of the right hand downward and toward your body. Feel the stretch along the top of the forearm. Hold, then switch.', hold_secs: 30, reps: 3, notes: 'Keep the elbow fully straight to maximise the stretch along the extensor chain.' },
            advanced:   { instruction: 'Extend both arms forward, palms down. Simultaneously flex both wrists downward as far as possible without using your hands. Hold the active end range, then release.', hold_secs: 45, reps: 5, notes: 'The active version (no assistance from the other hand) builds end-range control, not just flexibility.' },
          },
        },
        { id: 'wf_003', name: 'Wrist Circles', target: 'Wrist joint mobility, forearm muscles',
          difficulty: {
            basic:      { instruction: 'Extend both arms forward. Make loose fists and slowly rotate both wrists in large circles — 10 times clockwise, then 10 times anticlockwise.', hold_secs: 0, reps: 3, notes: 'Move slowly. If one direction is stiffer, spend a little more time going that way.' },
            immediate:  { instruction: 'Extend both arms at shoulder height. Make firm fists and rotate wrists in controlled large circles, 10 each direction. Then spread fingers wide and repeat the circles with open hands.', hold_secs: 0, reps: 5, notes: 'The open-hand variation stretches the hand extensors and palm fascia simultaneously.' },
            advanced:   { instruction: 'Interlace fingers in front of you. Rotate the clasped hands in slow circles — 10 each direction — focusing on full range. Then reverse the interlace (other thumb on top) and repeat.', hold_secs: 0, reps: 7, notes: 'The interlaced position creates traction through the wrist joint during the circle.' },
          },
        },
      ],
    },
    {
      id: 'hands_fingers', name: 'Hands & Fingers',
      complaint: 'Typing fatigue, finger stiffness, palm tension',
      stretches: [
        { id: 'hf_001', name: 'Finger Fan', target: 'Intrinsic hand muscles, finger extensors, palmar fascia',
          difficulty: {
            basic:      { instruction: 'Hold one hand in front of you, palm facing out. Slowly spread all fingers as wide apart as possible. Hold the spread, then slowly close into a loose fist. Repeat on both hands.', hold_secs: 10, reps: 8, notes: 'Move at a gentle, controlled pace. Both the spreading and closing phases matter.' },
            immediate:  { instruction: 'Hold both hands in front of you, palms out. Spread fingers as wide as possible and hold. Then curl fingers into a tight fist and hold. Alternate between the two positions.', hold_secs: 15, reps: 8, notes: 'Create maximum contrast between full extension and full flexion.' },
            advanced:   { instruction: 'Hold both hands in front of you. Spread fingers wide and hold. Then, keeping fingers spread, try to bend only the first two finger joints while keeping the knuckle joints straight. Hold, then release.', hold_secs: 20, reps: 8, notes: 'This isolated curl is difficult — it targets the lumbricals, key muscles for fine motor control.' },
          },
        },
        { id: 'hf_002', name: 'Prayer Stretch', target: 'Finger flexors, palm fascia, wrist flexors',
          difficulty: {
            basic:      { instruction: 'Press both palms together in front of your chest in a prayer position. Hold the position, feeling the stretch across the palms and fingers.', hold_secs: 20, reps: 3, notes: 'Keep fingers together and palms flat against each other.' },
            immediate:  { instruction: 'Press both palms together in prayer position. Slowly lower the joined hands toward your waist while keeping the palms pressed together, increasing the wrist extension. Hold at the lowest comfortable point.', hold_secs: 30, reps: 3, notes: 'The lower you bring the hands, the more intense the stretch in the fingers and palm.' },
            advanced:   { instruction: 'Start in prayer position. Lower hands toward waist, then spread fingers apart while maintaining palm contact. Hold. Then bring back to chest height and reverse — prayer position with hands raised above chest height.', hold_secs: 40, reps: 3, notes: 'The spread-finger variation isolates palmar fascia. The raised position stretches finger extensors.' },
          },
        },
        { id: 'hf_003', name: 'Thumb Circles & Opposition', target: 'Thenar muscles, thumb flexors and extensors',
          difficulty: {
            basic:      { instruction: 'Hold one hand in front of you, palm up. Slowly circle your thumb in large loops — 10 times in each direction. Then touch your thumb tip to each finger tip in sequence. Repeat on the other hand.', hold_secs: 0, reps: 3, notes: 'Mouse use strains the thumb constantly. This is specific recovery for that.' },
            immediate:  { instruction: 'Circle each thumb 10 times each direction. Then touch thumb to each fingertip, applying firm pressure at each contact and holding for 3 seconds before moving to the next finger.', hold_secs: 3, reps: 3, notes: 'The 3-second hold at each opposition point develops strength as well as mobility.' },
            advanced:   { instruction: 'Circle thumbs slowly in each direction. Then, with the other hand, gently extend your thumb back away from the palm as far as comfortable. Hold. Then press the thumb across the palm as far as it will go. Hold.', hold_secs: 30, reps: 3, notes: 'The two-direction stretch covers both common thumb restriction patterns from mouse use.' },
          },
        },
      ],
    },
    {
      id: 'thoracic_spine', name: 'Thoracic Spine',
      complaint: 'Upper back stiffness, poor posture, restricted rotation',
      stretches: [
        { id: 'ts_001', name: 'Thoracic Extension over Chair', target: 'Thoracic spine extensors, costovertebral joints',
          difficulty: {
            basic:      { instruction: 'Sit toward the front of your chair. Interlace your hands behind your head. Gently arch back over the top edge of the chair, letting your upper back extend. Hold.', hold_secs: 20, reps: 3, notes: 'Only go to the point of comfortable stretch. Use a chair with a firm top edge.' },
            immediate:  { instruction: 'Sit toward the front of your chair. Interlace hands behind your head and elbows wide. Arch back over the chair top, looking up at the ceiling. Hold at the end range, then slowly return upright.', hold_secs: 30, reps: 3, notes: 'Move the arch point up and down slightly to target different thoracic levels.' },
            advanced:   { instruction: 'Sit toward the front of your chair. Interlace hands behind your head. Arch back over the chair top, then add a slow rotation left and right while extended, holding at the end range of each rotation.', hold_secs: 20, reps: 5, notes: 'The rotation in extension is the most effective combination for restoring thoracic mobility.' },
          },
        },
        { id: 'ts_002', name: 'Seated Thoracic Rotation', target: 'Thoracic rotators, obliques',
          difficulty: {
            basic:      { instruction: 'Sit tall with feet flat on the floor. Cross your arms over your chest. Slowly rotate your upper body to the right as far as comfortable, hold briefly, then rotate to the left.', hold_secs: 15, reps: 5, notes: 'Keep hips facing forward — the rotation should come from the upper back, not the pelvis.' },
            immediate:  { instruction: 'Sit tall. Place your right hand on the outside of your left knee. Use that grip to gently pull yourself into a deeper left rotation. Hold, then switch sides.', hold_secs: 30, reps: 4, notes: 'The hand-on-knee gives mechanical advantage without forcing the spine.' },
            advanced:   { instruction: 'Sit tall. Rotate to the right. Place your left elbow on the outside of your right knee and use it as leverage to deepen the rotation. Look over your right shoulder and hold. Switch sides.', hold_secs: 45, reps: 4, notes: 'Breathe out on the rotation — exhaling allows the ribcage to rotate further.' },
          },
        },
        { id: 'ts_003', name: 'Thread the Needle', target: 'Thoracic rotation, posterior shoulder, rhomboids',
          difficulty: {
            basic:      { instruction: 'Kneel on all fours (hands and knees). Slide your right arm along the floor under your left arm until your right shoulder and cheek rest on the floor. Hold the rotation, then return and switch sides.', hold_secs: 25, reps: 3, notes: 'This is a floor-based stretch. If kneeling is uncomfortable, skip to the seated variation.' },
            immediate:  { instruction: 'On all fours. Thread your right arm under the left, aiming to get the right shoulder flat on the floor. Use your left arm to push the floor away, deepening the thoracic rotation. Hold, then switch.', hold_secs: 35, reps: 3, notes: 'The pushing arm increases the rotation through active assistance.' },
            advanced:   { instruction: 'On all fours. Thread the right arm under the left. Once the right shoulder is on the floor, reach the left arm up to the ceiling, following it with your gaze. Hold the full rotation. Switch sides.', hold_secs: 45, reps: 3, notes: 'Opening the top arm to the ceiling creates maximum thoracic rotation range.' },
          },
        },
      ],
    },
    {
      id: 'lower_back_hip_flexors', name: 'Lower Back & Hip Flexors',
      complaint: 'Lumbar compression, hip tightness from prolonged sitting',
      stretches: [
        { id: 'lb_001', name: 'Standing Hip Flexor Lunge Stretch', target: 'Iliopsoas, rectus femoris',
          difficulty: {
            basic:      { instruction: 'Stand behind your chair and hold the backrest for balance. Step your right foot back into a split stance. Lower your right knee toward the floor, keeping your left knee over your left ankle. Feel the stretch in your right hip. Hold, then switch sides.', hold_secs: 25, reps: 3, notes: 'You do not need to go deep. A small step back with an upright torso is enough to feel the hip flexor.' },
            immediate:  { instruction: 'Step into a lunge position, right foot back. Lower the right knee toward the floor. Tuck your pelvis under (posterior tilt) to increase the hip flexor stretch. Hold, then switch sides.', hold_secs: 35, reps: 3, notes: 'The pelvic tuck is the key — without it you are mostly stretching the quad, not the hip flexor.' },
            advanced:   { instruction: 'Lunge position, right foot back, knee hovering above the floor. Tuck pelvis, then reach the right arm overhead and lean slightly left. Hold the combined hip flexor and lateral trunk stretch. Switch sides.', hold_secs: 45, reps: 3, notes: 'The overhead reach lengthens the entire hip flexor chain from the lumbar spine through to the femur.' },
          },
        },
        { id: 'lb_002', name: 'Seated Forward Fold', target: 'Lumbar erectors, hamstrings, sacroiliac joint',
          difficulty: {
            basic:      { instruction: 'Sit at the edge of your chair, feet flat. Slowly hinge forward from your hips, letting your hands reach toward the floor between your feet. Let your head and neck relax. Hold.', hold_secs: 25, reps: 3, notes: 'Do not force the reach. Let gravity and relaxed breathing draw you further down over time.' },
            immediate:  { instruction: 'Sit at the edge of your chair. Feet wide. Hinge forward from the hips and reach both hands to the floor or toward the feet. Hold at your end range.', hold_secs: 35, reps: 3, notes: 'Wider feet allows the torso to fold deeper, increasing the lumbar stretch.' },
            advanced:   { instruction: 'Sit at the edge of your chair, feet together. Hinge forward and try to reach hands flat to the floor. Hold at your deepest point, then walk hands left and hold, then right and hold.', hold_secs: 40, reps: 3, notes: 'The lateral walks target the quadratus lumborum — the side lower back muscle that often causes stiffness.' },
          },
        },
        { id: 'lb_003', name: 'Knee to Chest', target: 'Lumbar spine, gluteus maximus, sacroiliac joint',
          difficulty: {
            basic:      { instruction: 'Sit tall in your chair. Lift your right knee and hold it with both hands, drawing it gently toward your chest. Hold, then lower and switch sides.', hold_secs: 20, reps: 3, notes: 'Keep your back upright — do not round forward to meet the knee.' },
            immediate:  { instruction: 'Sit tall. Draw your right knee to your chest with both hands and hold firmly. Then slowly rotate the knee outward while maintaining the hold. Hold the rotated position, then switch sides.', hold_secs: 30, reps: 3, notes: 'The rotation adds a hip external rotator stretch on top of the lumbar decompression.' },
            advanced:   { instruction: 'Lie on your back on the floor. Draw both knees to the chest simultaneously, wrapping arms around the shins. Rock gently side to side. Then extend one leg at a time while holding the other knee in.', hold_secs: 40, reps: 4, notes: 'The floor version allows full lumbar decompression with gravity removed. Most effective at end of day.' },
          },
        },
      ],
    },
    {
      id: 'glutes_piriformis', name: 'Glutes & Piriformis',
      complaint: 'Seat compression, deep buttock tightness, sciatica risk',
      stretches: [
        { id: 'gp_001', name: 'Seated Figure Four', target: 'Piriformis, gluteus medius and minimus, hip external rotators',
          difficulty: {
            basic:      { instruction: 'Sit tall in your chair. Cross your right ankle over your left knee to form a figure four shape. Sit tall and feel the stretch in the outer right hip. Hold, then switch sides.', hold_secs: 25, reps: 3, notes: 'If you cannot comfortably cross the ankle, just lift the knee toward the opposite shoulder instead.' },
            immediate:  { instruction: 'Sit tall. Cross right ankle over left knee. Gently press down on the right knee with your right hand while hinging your torso forward from the hips. Feel the deep glute stretch. Hold, then switch.', hold_secs: 35, reps: 3, notes: 'The forward hinge of the torso is key — it dramatically increases the piriformis stretch.' },
            advanced:   { instruction: 'Sit tall. Cross right ankle over left knee. Hinge forward and wrap both hands around the left shin, drawing yourself forward into a deep fold. Hold at full depth. Switch sides.', hold_secs: 50, reps: 3, notes: 'The deepest seated version of this stretch. Breathe steadily — the piriformis responds well to sustained, relaxed holds.' },
          },
        },
        { id: 'gp_002', name: 'Standing Glute Stretch', target: 'Gluteus maximus, piriformis',
          difficulty: {
            basic:      { instruction: 'Stand behind your chair, holding the backrest. Shift your weight onto your left leg. Cross your right ankle over your left thigh. Slowly bend your left knee to lower into the position until you feel a stretch in the right glute. Hold, then switch.', hold_secs: 25, reps: 3, notes: 'Use the chair for balance. Only bend the standing knee as far as comfortable.' },
            immediate:  { instruction: 'Stand holding your chair. Cross right ankle over left thigh, flex the right foot. Bend your left knee and sit back as if toward a chair, deepening the glute stretch. Hold, then switch.', hold_secs: 35, reps: 3, notes: 'Flexing the crossed foot protects the knee joint while increasing the hip stretch.' },
            advanced:   { instruction: 'Stand without support. Cross right ankle over left thigh. Sit back and down, balancing in the position with arms extended forward for counterbalance. Hold the deep single-leg squat position. Switch sides.', hold_secs: 45, reps: 3, notes: 'The unsupported version requires balance and quad strength as well as glute flexibility.' },
          },
        },
        { id: 'gp_003', name: 'Supine Piriformis Stretch', target: 'Piriformis, deep hip external rotators',
          difficulty: {
            basic:      { instruction: 'Lie on your back with knees bent, feet flat. Cross your right ankle over your left knee. Hold your left thigh with both hands and gently draw both legs toward your chest. Hold, then switch.', hold_secs: 30, reps: 3, notes: 'This floor version is the most effective for the piriformis. Use it at lunch or end of day.' },
            immediate:  { instruction: 'Lie on your back. Cross right ankle over left knee. Thread your right arm through the gap and interlace hands behind the left thigh. Draw firmly toward your chest. Hold, then switch.', hold_secs: 40, reps: 3, notes: 'The interlaced grip allows more consistent tension than holding the shin.' },
            advanced:   { instruction: 'Lie on your back. Cross right ankle over left knee. Draw knees toward chest firmly. Then slowly straighten the left leg while maintaining the figure four, increasing the leverage. Hold, then switch.', hold_secs: 50, reps: 3, notes: 'Straightening the lower leg shifts more load into the piriformis and less into the glute max.' },
          },
        },
      ],
    },
    {
      id: 'calves_ankles', name: 'Calves & Ankles',
      complaint: 'Poor circulation from static sitting, ankle stiffness',
      stretches: [
        { id: 'ca_001', name: 'Seated Ankle Circles', target: 'Ankle joint mobility, calf muscles',
          difficulty: {
            basic:      { instruction: 'Sit tall. Lift your right foot slightly off the floor. Slowly rotate the ankle in large circles — 10 clockwise, 10 anticlockwise. Lower and repeat on the left.', hold_secs: 0, reps: 3, notes: 'This is the most important desk exercise for circulation. Do this hourly if possible.' },
            immediate:  { instruction: 'Sit tall. Cross right ankle over left knee. Hold the ankle with both hands and rotate it through full range — 10 times each direction. Really exaggerate the circle size. Switch sides.', hold_secs: 0, reps: 3, notes: 'The manual rotation allows more range than active rotation alone.' },
            advanced:   { instruction: 'Stand on one leg (hold chair if needed). Lift the other foot and trace the alphabet in the air with your big toe. Switch feet. Full range of motion in every letter.', hold_secs: 0, reps: 1, notes: 'The alphabet drill covers every plane of ankle movement and improves proprioception.' },
          },
        },
        { id: 'ca_002', name: 'Standing Calf Stretch', target: 'Gastrocnemius, soleus',
          difficulty: {
            basic:      { instruction: 'Stand facing your desk or wall. Step your right foot back about 60cm. Keep the right heel down and the right leg straight. Lean toward the desk until you feel a stretch in the right calf. Hold, then switch.', hold_secs: 25, reps: 3, notes: 'The straight back leg stretches the gastrocnemius — the larger, upper calf muscle.' },
            immediate:  { instruction: 'Step right foot back. Stretch gastrocnemius with straight leg as above. Then slightly bend the right knee while keeping the heel down — feel the stretch move lower into the soleus. Hold each position. Switch sides.', hold_secs: 30, reps: 3, notes: 'Two holds per side — straight leg then bent knee. Both muscles need to be stretched separately.' },
            advanced:   { instruction: 'Stand with the ball of your right foot on a step or book edge, heel off. Slowly lower the heel below the step level until you feel a deep calf stretch. Hold, then raise back up. Switch sides.', hold_secs: 40, reps: 5, notes: 'The drop below neutral dramatically increases stretch range. Lower slowly and controlled.' },
          },
        },
        { id: 'ca_003', name: 'Heel and Toe Raises', target: 'Calf muscles, tibialis anterior, circulation',
          difficulty: {
            basic:      { instruction: 'Sit tall. Keeping heels on the floor, raise both sets of toes as high as possible. Hold briefly, then lower. Then raise both heels off the floor as high as possible. Alternate between the two.', hold_secs: 5, reps: 15, notes: 'This pumps blood through the lower leg and is ideal to do during calls or reading.' },
            immediate:  { instruction: 'Stand behind your chair. Rise up onto both toes as high as possible, hold briefly, then lower slowly. Then raise both toes off the floor (rocking onto heels), hold, and lower slowly.', hold_secs: 5, reps: 15, notes: 'The slow lowering builds eccentric calf strength while improving circulation.' },
            advanced:   { instruction: 'Stand on one leg. Rise onto the toes of that foot as high as possible, hold, then lower slowly over 4 counts. Complete 12 reps, then switch legs.', hold_secs: 3, reps: 12, notes: 'Single-leg calf raises are one of the best exercises for lower leg strength and circulatory health.' },
          },
        },
      ],
    },
    {
      id: 'eyes', name: 'Eyes',
      complaint: 'Screen fatigue, dryness, focal tension, headaches',
      stretches: [
        { id: 'ey_001', name: '20-20-20 Focal Reset', target: 'Ciliary muscle (focus), eye strain relief',
          difficulty: {
            basic:      { instruction: 'Look away from your screen at an object at least 6 metres (20 feet) away. Hold your gaze there for 20 seconds without refocusing on anything closer. Blink naturally throughout.', hold_secs: 20, reps: 1, notes: 'This is the single most evidence-backed technique for reducing digital eye strain. Do it every 20 minutes if possible.' },
            immediate:  { instruction: 'Look at a distant object (6m+) for 20 seconds. Then shift your focus to an object about 1 metre away for 10 seconds. Then back to the distant object. Repeat the near-far shift 5 times.', hold_secs: 20, reps: 5, notes: 'The near-far cycling exercises the ciliary muscle through its full range, like a workout for the focusing mechanism.' },
            advanced:   { instruction: 'Hold your thumb about 30cm from your face. Focus on the thumb for 5 seconds, then shift to an object across the room for 5 seconds, then to the furthest visible point for 5 seconds. Cycle through all three distances 5 times.', hold_secs: 5, reps: 15, notes: 'Three-distance cycling gives the ciliary muscle a complete range workout.' },
          },
        },
        { id: 'ey_002', name: 'Palming', target: 'Eye muscles, optic nerve tension, stress relief',
          difficulty: {
            basic:      { instruction: 'Rub your palms together briskly for 5 seconds until they feel warm. Cup your palms gently over your closed eyes without pressing on the eyeballs. Rest in the darkness and breathe slowly.', hold_secs: 30, reps: 2, notes: 'The warmth and darkness allow the eye muscles to fully relax. A favourite of office workers globally.' },
            immediate:  { instruction: 'Warm your palms and cup over closed eyes. Take 5 slow, deep breaths while in the darkness. On each exhale, consciously release any tension in your forehead, jaw, and neck as well.', hold_secs: 45, reps: 2, notes: 'Coupling eye rest with progressive relaxation of the face amplifies the recovery effect.' },
            advanced:   { instruction: 'Warm your palms and cup over eyes. Spend 60 seconds in complete darkness. Then, keeping eyes closed, slowly look up, down, left, and right — 5 times each direction. Keep palms in place throughout.', hold_secs: 60, reps: 1, notes: 'The gentle closed-eye movements release tension in the extraocular muscles while the palming maintains the relaxed environment.' },
          },
        },
        { id: 'ey_003', name: 'Eye Tracking & Peripheral Activation', target: 'Extraocular muscles, peripheral vision, oculomotor control',
          difficulty: {
            basic:      { instruction: 'Sit tall. Keep your head still. Slowly look as far right as comfortable without moving your head, hold for 3 seconds, then slowly look as far left as comfortable. Repeat 5 times.', hold_secs: 3, reps: 10, notes: 'Keep the head completely still. All movement is in the eyes only.' },
            immediate:  { instruction: 'Keep head still. Slowly look right, hold 3 seconds. Then up, hold. Then left, hold. Then down, hold. Make a slow square with your eyes. Reverse direction. Repeat 3 times each direction.', hold_secs: 3, reps: 12, notes: 'The square pattern exercises all four rectus muscles of the eye systematically.' },
            advanced:   { instruction: 'Keep head still. Trace a large slow figure-of-eight (infinity symbol) with your eyes — first horizontally, then vertically. 5 repetitions of each orientation. Move as slowly as possible.', hold_secs: 0, reps: 10, notes: 'The figure-of-eight requires smooth pursuit tracking, which is a different neurological demand from saccadic (jump) movements.' },
          },
        },
      ],
    },
  ],
}

export const ZONE_COLORS = {
  neck_shoulders:         '#2a7fad',
  chest_pectorals:        '#c47e5a',
  wrists_forearms:        '#2f9c93',
  hands_fingers:          '#4a72a8',
  thoracic_spine:         '#5f87b8',
  lower_back_hip_flexors: '#7a6ba8',
  glutes_piriformis:      '#3a8a6a',
  calves_ankles:          '#437a94',
  eyes:                   '#9a7a5a',
}

export const LEGACY_ID_MAP = {
  neck:   'neck_shoulders',
  wrists: 'wrists_forearms',
  hips:   'lower_back_hip_flexors',
  spine:  'thoracic_spine',
}
