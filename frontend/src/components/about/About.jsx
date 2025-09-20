

import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion } from "framer-motion";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.get("/about/").then((res) => setAbout(res.data));
  }, []);

  if (!about) return null;

  return (
    <div className="px-6 md:px-20 py-12 font-['Libre_Baskerville'] text-[#2F4F4F]">
      {/* About + Mission Section */}
      {/* About + Mission Section */}
<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
  {/* Left Column - Text */}
  <div className="md:w-4/5 text-center md:text-left space-y-6">
    {/* AboutStepUp */}
    <motion.h2
      className="text-3xl font-bold text-center text-black"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {about.title}
    </motion.h2>
    <motion.p
      className="text-lg leading-relaxed text-black text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {about.description}
    </motion.p>

    {/* Mission */}
    <motion.h2
      className="text-3xl font-bold mt-6 text-center text-black"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {about.mission_title}
    </motion.h2>
    <motion.p
      className="text-lg leading-relaxed text-black text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {about.mission_description}
    </motion.p>
  </div>

  {/* Right Column - Side Image */}
  {about.side_image && (
    <motion.img
      src={about.side_image}
      alt="Side"
      className="md:w-1/5 w-full rounded-2xl object-contain"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    />
  )}
</div>


      {/* Features Section */}
      <div className="text-center mt-12">
        {about.center_image && (
          <motion.img
            src={about.center_image}
            alt="Center"
            className="w-[350px] mx-auto mb-8 rounded-full shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {about.features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className=" p-6 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
