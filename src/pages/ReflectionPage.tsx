import { useState } from 'react';
import { ChevronDown, ChevronRight, Users, Lightbulb, BookOpen, Github } from 'lucide-react';

interface TeamMember {
    name: string;
    id: string;
    role: string;
    reflection: Array<string>;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Nurul Izzah Mardhiyyah binti Mahmud',
        id: '223368',
        role: 'Team Lead and Website Development',
        reflection: [
            "As the team lead and website developer for this project, my main responsibility was designing and implementing the interactive learning platform using React. The website was not intended to be a static showcase, but a space where users could actively explore how different path planning algorithms behave and make decisions. This required careful planning of both the technical structure and the learning flow presented to users.",
            "The most challenging part of the project was building the interactive pages. Unlike videos or written explanations, interactive simulations must respond correctly to every user action. Placing walls, choosing start and goal positions, switching algorithms, and stepping through execution all needed to reflect the actual logic of each algorithm. This became more complex because the project did not focus on only two algorithms. Instead, the interactive page includes reactive methods, grid-based planning such as A*, and sampling-based approaches. Each category operates under different assumptions and required different visual feedback.",
            "A key difficulty was ensuring that the interface remained understandable for beginners while still being accurate. For example, grid-based algorithms explore nodes systematically, while reactive algorithms respond only to immediate surroundings and can become stuck in loops. Representing these differences visually without overwhelming users required many design iterations. The use of “Run”, “Step”, and “Reset” controls was intentional, allowing users to slow down the algorithm and observe decision-making one step at a time.",
            "Another important design decision was structuring the interactive page into clear stages. Users first choose how the robot thinks, then select a specific algorithm. This separation helps learners understand that algorithms belong to broader categories, rather than viewing each one as an isolated technique. The explanation panel and mini challenges were added to guide users toward reflection, encouraging them to predict behavior before observing the result.",
            "Through developing the interactive platform, I gained a deeper understanding of both path planning algorithms and educational design. I learned that even simple algorithms can appear confusing when visualized poorly, and that small interface choices can significantly affect user understanding. Building these tools also reinforced the importance of clarity, consistency, and incremental learning when explaining robotics concepts.",
            "As a team lead, I also had to coordinate technical direction and ensure that the interactive components aligned with the overall narrative of the project. This involved discussing requirements with teammates, integrating feedback from content designers, and refining features to maintain consistency across pages. Managing both leadership and development responsibilities was demanding, but it helped me improve my communication and decision-making skills. By aligning technical implementation with educational goals, I ensured the website functioned as a cohesive learning tool rather than a collection of separate features. This experience reinforced the importance of collaboration, iteration, and user-centered thinking in technical educational projects at university level.",
        ]
        },
    {
        name: 'Adibah Nawal Binti Muhammad Lukman',
        id: '224048',
        role: 'Video Creator',
        reflection: [
            "In this group project, my main contribution focused on developing and delivering the Video 2 content, which explains global path planning using the A* algorithm. My responsibility was to communicate a more technical concept in a way that still feels understandable and engaging for learners who may not be deeply familiar with algorithms. Compared to the reactive navigation portion, A* introduces multiple abstract ideas at once, including grid representation, path cost, heuristics, and the evaluation function, so my challenge was to structure the explanation so that each concept builds naturally into the next.",
            "When planning the video, I prioritized clarity and pacing. Instead of starting immediately with the formula f(n) = g(n) + h(n), I treated it as the result of a story: the robot needs a way to decide which move is “best” before it actually moves. I first framed the problem in simple terms: reactive movement can be inefficient or loop, but planning aims to reach the goal efficiently. Then, I introduced how A* “thinks ahead” by exploring possible rouotes. From there, I broke the explanation into three ideas: (1) how we represent space as a grid, (2) what “cost” means in navigation, and (3) how the heuristic guides the search.",
            "A key decision I made was to explain g(n) and h(n) using intuitive meaning instead of purely mathematical definitions. I described g(n) as the “cost so far” (how much effort the robot has already spent from start to the current cell), and h(n) as a “smart guess” (how far the robot still needs to go). This helped avoid a common confusion where learners think the heuristic is a guaranteed distance rather than an estimate. I also highlighted that the heuristic is meant to guide direction, not replace actual exploration, so the robot still checks neighbors and updates costs. By emphasizing this, I aimed to prevent the misconception that A* magically “knows” the correct path.",
            "Through this contribution, I learned that explaining technical robotics concepts is not just about correctness, it is about choosing the right level of detail. If the explanation is too simplified, the audience may not understand why A* is effective; if it is too detailed, the audience may disengage. Balancing these constraints required me to constantly ask: “What does the learner need to understand at this stage to follow the next idea?” This is why I introduced cost before heuristics, and heuristics before the full evaluation function. I also became more aware that some terms (like “optimal” or “admissible heuristic”) can overwhelm learners if not handled carefully. So, I kept these as supporting ideas rather than the main focus, while still maintaining accurate meaning.",
        ]
    },
    {
        name: 'Loh Qiao En',
        id: 'SA00027',
        role: 'Video Creator',
        reflection: [
            "For this project, I was responsible for Video 1: “How a Robot Finds Its Way Without a Map.” My outreach intent was to explain reactive navigation in a way that is easy to understand for beginners, especially pre-university students and people who are curious about robotics but do not have a technical background. I wanted viewers to understand that robots do not think like humans. Instead, they make decisions based on simple rules and sensor information. The main goal of my video was to show that even without a map or advanced algorithms, a robot can still move, react, and sometimes reach its destination.",
            "While planning the video, I focused on keeping the explanation clear, visual, and story-based. I avoided complex terms, equations, and programming details. I used simple examples, such as walking in a dark maze and touching the wall, to help viewers imagine how a robot behaves without knowing the environment. I also used slow demonstrations in the simulator so that viewers could clearly see how the robot reacts step by step. This helped make the idea of reactive navigation less abstract and more relatable.",
            "I also adapted my communication by thinking about different audiences. For beginners, I used short sentences, everyday language, and repeated key ideas like “the robot reacts” and “the robot does not plan ahead.” I explained why reactive navigation works in simple environments and why it fails in complex ones. At the same time, I made sure the explanation was accurate so that more advanced viewers could still see the connection to robotics concepts such as local planning and sensor-based decision making.",
            "This project helped me reflect on how important communication is in engineering. I learned that the same concept can be explained in different ways depending on who is listening. Teaching beginners requires patience, clarity, and good examples, not more technical detail.",
            "I would like to acknowledge my group members for their collaboration, discussions, and feedback throughout the project. I also acknowledge the use of course materials from CSC4702 Robotic System Development, online references on reactive navigation, and standard robotics concepts such as wall-following and bug algorithms. These resources helped guide the content and structure of the video. Overall, working on Video 1 improved my understanding of both robotics and effective communication.",
        ]
    },
    {
        name: 'Filzah Irdina',
        id: '224233',
        role: 'Video 2 Presenter',
        reflection: [
            "My outreach intent in this project was to clearly explain A* path planning in an engaging and beginner-friendly way, using our interactive simulator as the main teaching tool. My role was to present Video 2, where I demonstrated how A* plans paths by considering both movement cost and heuristic distance to the goal. I structured the presentation to first introduce the idea of planning ahead, then visually show how the algorithm expands nodes, prioritises promising paths, and finally produces an optimal route.",
            "In preparing the video, I coordinated closely with the simulator design and storyboard to ensure that what I explained matched what viewers saw on screen. I selected map layouts that clearly reveal frontier expansion, explored nodes, and the final shortest path. This alignment was important to avoid confusion and keep the explanation intuitive.",
            "One challenge was balancing technical accuracy with simplicity. To address this, I used short explanations and direct comparisons with reactive navigation, highlighting why A* is more efficient and reliable. This experience strengthened my confidence in explaining planning algorithms through visual demonstrations and teamwork."
        ]
        },
    {
        name: 'Ba Yulin',
        id: '225789',
        role: 'Video 1 Presenter',
        reflection: [
            "Our outreach intent is to explain reactive navigation in a simple and engaging way, using our interactive simulator as the main learning tool. My role was to plan and present Video 1, which introduces reactive/local navigation and demonstrates wall-following (left-hand rule). I focused on building a clear storyline: first set up the scenario, then explain the idea, then show a working run, and finally show a case where the same rule struggles. This structure helped the video feel like a guided experiment rather than a long lecture.",
            "In preparation, I worked closely with the team’s storyboard and the simulator interface. I had to align my narration with what the audience sees on screen—where the start and goal are placed, what counts as a wall, and how the robot moves step by step. I also checked that the map layout we chose supports the points we wanted to make. For example, I needed one map where wall-following can reach the goal smoothly, and another configuration that can create looping behavior. This planning step mattered because a demo that fails unexpectedly can confuse viewers and break the flow of the explanation.",
            "The biggest challenge for my part was not only time control, but also demonstration reliability. With reactive rules, the robot reacts locally, so the outcome depends heavily on the environment. During testing, I noticed that small changes—like shifting a wall by one cell or placing the goal behind an obstacle—could change the result from ‘success’ to ‘stuck.’ Instead of treating this as a problem, I used it as a learning point: one successful run to show why the method is attractive (simple, fast, low memory), and one failure run to show the limitation (no guarantee to reach the goal, and not optimal).",
            "While recording, I learned to pay attention to pacing and visual cues. Since our target audience is beginners, I kept my language simple and avoided heavy technical terms. I used short sentences and explained each step clearly, matching my narration to what the viewer sees on the screen. To make the idea easier, I also used a simple analogy: reactive navigation is like walking in the dark while touching the wall—you only react to what you feel nearby. I made sure the transition between slides and the simulator felt natural, like: ‘Now let’s watch it in action.’ This experience improved my confidence in explaining technical behavior through video.",
            "From a teamwork perspective, I appreciated how our roles complemented each other. The interactive website provides the core platform, while the videos give a guided learning path for beginners. I communicated with teammates about which map to use, what settings to show, and how to keep the video consistent with the website categories (Reactive/Local vs other planners). These small details matter because they reduce confusion when viewers follow the demo.",
            "Overall, this project taught me that ‘simple’ algorithms are not always simple to present, especially when behavior depends on the environment. I now understand reactive navigation more deeply as a trade-off: it is easy to implement and can work well in some mazes, but it does not plan ahead and can loop in certain layouts. Acknowledgement: thanks to my teammates for the storyboard, simulator development, and map suggestions. References: course notes and our group’s interactive simulator."
        ]
    }
];

export function ReflectionPage() {
    const [expandedMember, setExpandedMember] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Reflection & Resources</h1>
                    <p className="text-xl text-gray-600">
                        Project insights, team contributions, and learning outcomes
                    </p>
                </div>

                {/* Overall Project Reflection */}
                <section className="mb-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Lightbulb className="w-8 h-8" />
                        Overall Project Reflection
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold mb-3">🌍 Outreach Intent</h3>
                            <p className="text-blue-50 leading-relaxed">
                                Our goal was not to teach formulas first, but to help learners <strong>build intuition</strong>.
                                By using a consistent maze narrative, we connected simple rules (reactive) to deliberate
                                planning (A*), allowing learners to see <em>why</em> planning matters.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">📢 Communication Strategy Across Audiences</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Beginner learners</h4>
                                    <ul className="space-y-1 text-sm text-blue-100">
                                        <li>• Story metaphors (walking in the dark)</li>
                                        <li>• Rule-based explanations</li>
                                        <li>• Visual repetition</li>
                                    </ul>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Technical learners</h4>
                                    <ul className="space-y-1 text-sm text-blue-100">
                                        <li>• Cost functions</li>
                                        <li>• Heuristics</li>
                                        <li>• Optimality conditions</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-blue-50 mt-3">
                                The same robot appears throughout — only the <em>explanation depth</em> changes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What Worked Well */}
                <section className="mb-12 bg-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-green-900">✅ What Worked Well</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">
                Step-by-step simulations made decisions visible
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">
                Challenges transformed observation into reasoning
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                            <span className="text-gray-700">
                Comparisons (Reactive vs A*) clarified strengths and limits
              </span>
                        </li>
                    </ul>
                </section>

                {/* What We Would Improve */}
                <section className="mb-12 bg-blue-50 rounded-xl p-8 border border-blue-200">
                    <h2 className="text-2xl font-bold mb-6 text-blue-900">🔧 What We Would Improve</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-600 text-xl flex-shrink-0">→</span>
                            <span className="text-gray-700">
                More edge cases (dead ends, misleading heuristics)
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-600 text-xl flex-shrink-0">→</span>
                            <span className="text-gray-700">
                Time-based comparison (speed vs optimality)
              </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-600 text-xl flex-shrink-0">→</span>
                            <span className="text-gray-700">
                Short auto-feedback quizzes after each page
              </span>
                        </li>
                    </ul>
                </section>

                {/* Individual Reflections */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-8 h-8 text-blue-600" />
                        Individual Reflections
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Click on each team member to read their personal reflections on the project.
                    </p>

                    <div className="space-y-4">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                            >
                                <button
                                    onClick={() => setExpandedMember(expandedMember === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg">
                                            {member.name} ({member.id})
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Role Focus: {member.role}</p>
                                    </div>
                                    {expandedMember === index ? (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>

                                {expandedMember === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <h4 className="font-semibold mb-2">Reflection</h4>
                                        <div className="space-y-4">
                                            {member.reflection.map((para, i) => (
                                                <p key={i} className="text-gray-700  indent-8 leading-relaxed text-justify">
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Resources & Acknowledgment */}
                <section className="bg-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Resources & Acknowledgment
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Github className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h3 className="font-semibold">Simulation and website source code</h3>
                                <a
                                    href="https://github.com/asteraaaaa/csc4702-path-planning-web.git"
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    View on GitHub →
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h3 className="font-semibold">Course materials</h3>
                                <p className="text-sm text-gray-600">CSC4702 Robotic System Development</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-gray-600 mt-0.5" />
                            <div>
                                <h3 className="font-semibold">Inspiration</h3>
                                <p className="text-sm text-gray-600">
                                    Maze-solving and pathfinding visualizations from the robotics community
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
