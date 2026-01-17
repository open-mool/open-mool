import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function About() {
    return (
        <main className="min-h-screen bg-bg-canvas p-8 md:p-24 max-w-4xl mx-auto">
            <div className="mb-12 flex justify-between items-center">
                <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-human text-sm">
                    &larr; Back to Home
                </Link>
                <Logo showText={false} />
            </div>

            <article className="prose prose-lg prose-slate max-w-none font-body text-text-secondary">
                <h1 className="font-heading text-4xl mb-2 text-text-primary">The Open Mool Manifesto</h1>
                <h2 className="text-xl text-primary font-medium mb-8">The Digital Firebreak</h2>
                <div className="w-12 h-1 bg-primary mb-12"></div>

                {/* Section I */}
                <section className="mb-12">
                    <h3 className="font-heading text-2xl text-text-primary mb-4">I. The Quiet Extinction</h3>
                    <p className="mb-4">
                        Culture does not always die in battles. It rarely ends with a bang. Most often, culture dies in silence.
                    </p>
                    <p className="mb-4">
                        It dies in the pause between a question asked by a grandchild and the silence of a grandparent who has forgotten the answer. It dies when a dialect spoken for a thousand years is replaced by a standard textbook. It dies when the last person who knows the specific prayer for the harvest takes that secret with them to the grave.
                    </p>
                    <p className="mb-4">
                        In the Himalayas, we are witnessing a quiet extinction. Our history is not written in stone or stored in cloud servers; it is etched in the fragile, fading neural pathways of our elders.
                    </p>
                    <blockquote className="font-human italic text-xl text-text-primary border-l-4 border-primary pl-4 my-8">
                        Every time an elder in a remote village in Pithoragarh or Kinnaur passes away without their story being recorded, a library burns to the ground.
                    </blockquote>
                </section>

                {/* Section II */}
                <section className="mb-12">
                    <h3 className="font-heading text-2xl text-text-primary mb-4">II. The Great Forgetting</h3>
                    <p className="mb-4">
                        The Himalayas have always been more than a geological barrier; they were a cradle of civilization.
                    </p>
                    <p className="mb-4">
                        From the temple-builders of the <strong>Katyuri Dynasty</strong> to the trans-Himalayan traders who walked the Silk Routes to Tibet, our ancestors carved a life out of rock. They survived the brutality of the <strong>Gorkhali Raj</strong>, the extraction of the Colonial era, and the harshness of the terrain.
                    </p>
                    <p className="mb-4">
                        But today, we face a threat that no invasion could accomplish: <strong>Amnesia</strong>.
                    </p>
                    <p className="mb-4">
                        The mountains are being hollowed out—physically and culturally. The cedars are falling to the axe, and the mountains are being tunneled for power. We see the landslides on the news, but we miss the invisible landslide of our heritage.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>The <strong>Ghost Villages (Palan)</strong> are emptying, leaving behind homes where the hearth fires have gone cold.</li>
                        <li>The epic ballads of <strong>Rajula-Malushahi</strong>, once sung through the night, are shrinking into soundbites.</li>
                        <li>The intricate knowledge of the <strong>Bhotia trade routes</strong>—a web of commerce and culture that spanned nations—is fading into myth.</li>
                    </ul>
                    <p>
                        We are losing the software of our civilization while we argue over the hardware.
                    </p>
                </section>

                {/* Section III */}
                <section className="mb-12">
                    <h3 className="font-heading text-2xl text-text-primary mb-4">III. Open Mool: The Archive of Resilience</h3>
                    <p className="mb-4">
                        <strong>Open Mool is the resistance against this silence.</strong>
                    </p>
                    <p className="mb-4">
                        We are a collective of engineers, historians, and hill-folk building the sovereign digital infrastructure to protect Himalayan heritage. We are building a "Firebreak"—a permanent, indestructible line of defense against the erosion of memory.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>We are not a startup.</strong> We do not sell data; we steward it.</li>
                        <li><strong>We are not a museum.</strong> Museums are where culture goes to retire. We are an archive where culture goes to be reborn.</li>
                        <li><strong>We are not just for Uttarakhand.</strong> While our roots are in the Doon valley, our branches cover the entire Himalayan belt—from the saffron fields of Kashmir to the orchards of Himachal and the peaks of the North East.</li>
                    </ul>
                </section>

                {/* Section IV */}
                <section className="mb-12">
                    <h3 className="font-heading text-2xl text-text-primary mb-4">IV. The Mission: From Oral to Eternal</h3>
                    <p className="mb-4">
                        <strong>We are building the Source Code of the Himalayas.</strong>
                    </p>
                    <p className="mb-4">
                        We use technology—Artificial Intelligence, Vector Search, and Open Source protocols—not to replace tradition, but to amplify it.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>When an elder speaks a forgotten dialect, our AI learns to transcribe it, ensuring the language finds a place in the digital future.</li>
                        <li>When a <strong>Jagar</strong> is recorded, we tag and contextualize it, so a researcher in Tokyo or a student in Almora can understand its meaning.</li>
                    </ul>
                    <p className="font-medium text-text-primary">
                        We are bridging the gap between the Vedas and the Vector Database.
                    </p>
                </section>

                {/* Section V */}
                <section className="mb-16">
                    <h3 className="font-heading text-2xl text-text-primary mb-4">V. The Invitation</h3>
                    <p className="mb-6">
                        This is not a task for one company or one government. It is a <strong>civilizational duty</strong>.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-subtle p-6 rounded-lg border border-primary/10">
                            <h4 className="font-heading text-xl text-primary mb-2">We are calling for Guardians.</h4>
                            <p className="text-sm">
                                If you have a phone, you are a historian. Go to your village. Sit with your elders. Hit record. Capture the story of the flood, the song of the wedding, the myth of the local deity. Be the one who saves the library from burning.
                            </p>
                        </div>
                        <div className="bg-subtle p-6 rounded-lg border border-primary/10">
                            <h4 className="font-heading text-xl text-primary mb-2">We are calling for Archivists.</h4>
                            <p className="text-sm">
                                If you write code, you are a builder of this digital ark. Help us engineer the tools that will carry our past into the future.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="font-heading text-xl text-text-primary mb-2">Join us. Let us break the silence.</p>
                        <p className="font-bold text-primary">Open Mool: Preserving the Soul of the Himalayas.</p>
                    </div>
                </section>

                {/* Section VI - Context */}
                <section className="mt-16 pt-8 border-t border-gray-100 bg-subtle/50 p-6 rounded-xl">
                    <h3 className="font-heading text-xl text-text-primary mb-6">VI. Historical References & Context</h3>
                    <dl className="grid gap-6 text-sm">
                        {[
                            { title: "Chipko Movement (1973)", desc: "A non-violent social and ecological movement by rural villagers, particularly women, in the Chamoli district, who protected trees from logging by embracing them. It is a defining symbol of Himalayan resilience." },
                            { title: "Katyuri Dynasty (c. 700–1200 CE)", desc: "The medieval ruling dynasty of Kumaon and Garhwal, responsible for constructing hundreds of stone temples (like Baijnath and Jageshwar) that define the region's architectural history." },
                            { title: "Gorkhali Raj (1790–1815)", desc: "The period of rule by the Gorkha Kingdom of Nepal over Kumaon and Garhwal. Often remembered in oral history as Gorkhyani, a time of martial law and hardship before the British annexation." },
                            { title: "Ghost Villages (Palan)", desc: "Refers to the modern socio-economic crisis of migration (Palan) from the hills to the plains, leaving over 1,700 villages in Uttarakhand officially uninhabited ('ghost villages')." },
                            { title: "Rajula-Malushahi", desc: "A legendary medieval love ballad of Kumaon, traditionally sung by bards over several nights, recounting the romance between Rajula (a trader's daughter) and Malushahi (a Katyuri king)." },
                            { title: "Bhotia Trade Routes", desc: "The ancient trans-Himalayan trade network maintained by the Bhotia community (Shaukas, Marchhas, Tolchhas) with Tibet. This vibrant cultural and economic exchange was severed after the 1962 Sino-Indian war." },
                            { title: "Jagar", desc: "A ritualistic form of spirit and deity worship practiced in the hills of Uttarakhand, where Jagariyas (bards) wake up local deities through ballads and drumming to seek justice or healing." },
                            { title: "Koti Banal", desc: "An indigenous architectural style of multi-story buildings found in the Yamuna valley, designed over 900 years ago to be earthquake-resistant." }
                        ].map((item, i) => (
                            <div key={i}>
                                <dt className="font-bold text-text-primary">{item.title}</dt>
                                <dd className="text-text-secondary mt-1">{item.desc}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <div className="mt-12 text-center">
                    <a href="mailto:hello@openmool.org" className="inline-block px-6 py-3 bg-primary text-white font-medium rounded hover:bg-red-700 transition-colors">
                        Contact the Archive &rarr;
                    </a>
                </div>

            </article>

        </main>
    );
}
