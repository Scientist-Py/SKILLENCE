import React from "react";
import { Sparkles, Zap, LayoutDashboard, Briefcase, Bot } from "lucide-react";
import { motion } from "framer-motion";

const OutcomeBanner = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-white">
            {/* Graphical Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Animated Gradient Blobs */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, -15, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-10 hover:shadow-md transition-shadow"
                    >
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-900 tracking-wide uppercase">
                            Become A Creator
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-10"
                    >
                        Don't Just Learn Code.{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                MASTER AI & AUTOMATION.
                            </span>
                            <motion.span
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 1 }}
                                className="absolute bottom-2 left-0 h-3 bg-blue-100/50 -z-10 -rotate-1"
                            />
                        </span>
                        <br />
                        <span className="block mt-6 text-2xl md:text-3xl lg:text-4xl text-gray-600 font-bold tracking-tight">
                            Build Your Own AI Agents, Smart Dashboards, Automation Systems & Real-World Projects.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-16 font-medium"
                    >
                        Turn your ideas into reality. Master the skills to build professional-grade applications from scratch.
                    </motion.p>

                    {/* Floating Icons / Visual Interest */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {[
                            { icon: <Bot size={32} />, label: "AI Agents", color: "bg-blue-50 text-blue-600", delay: 0.6 },
                            { icon: <Zap size={32} />, label: "Automation", color: "bg-purple-50 text-purple-600", delay: 0.7 },
                            { icon: <LayoutDashboard size={32} />, label: "Dashboards", color: "bg-pink-50 text-pink-600", delay: 0.8 },
                            { icon: <Briefcase size={32} />, label: "Real Projects", color: "bg-indigo-50 text-indigo-600", delay: 0.9 },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: item.delay }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-inner`}>
                                    {item.icon}
                                </div>
                                <span className="text-base font-bold text-gray-700">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OutcomeBanner;
