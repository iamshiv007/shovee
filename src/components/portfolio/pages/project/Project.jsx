"use client";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { CgWebsite } from "react-icons/cg";
import { HiExternalLink } from "react-icons/hi";
import { BsGithub } from "react-icons/bs";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [height1, setHeight1] = useState("");

  const { project, loading } = useSelector((state) => state.projectData);

  useEffect(() => {
    if (project?.userName) {
      setProjects(project.projects);
    }
  }, [project]);

  return (
    <Fragment>
      {!loading && project?.userName && (
        <section id='project'>
          <h2 className='pageHeading'>
            <CgWebsite /> Projects
          </h2>

          <div className={style.container}>
            {projects.map((project) => (
              <motion.div
                className={style.box}
                initial={{ opacity: 0, scale: 0 }}
                key={project.projectName}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                {/* Project Image */}
                <div
                  className={style.image}
                  onMouseLeave={() => setHeight1("")}
                  onMouseMove={() => setHeight1(project.projectName)}
                  style={{
                    backgroundImage: `url(${
                      project?.projectImage?.imageUrl || ""
                    })`,
                  }}
                >
                  <div
                    className={style.boxDetails}
                    onMouseLeave={() => setHeight1("")}
                    onMouseMove={() => setHeight1(project.projectName)}
                  >
                    {/* Project Name */}
                    <p
                      className='text-white'
                      onClick={() =>
                        setHeight1(height1 === "" ? project.projectName : "")
                      }
                    >
                      {project.projectName}
                    </p>
                    <div
                      className={style.linkWrapper}
                      style={
                        height1 === project.projectName
                          ? { maxHeight: "200px" }
                          : { maxHeight: "0" }
                      }
                    >
                      {/* GitHub Link */}
                      {project.liveUrl && (
                        <Link
                          className={style.link}
                          href={project.liveUrl}
                          target='_blank'
                        >
                          <HiExternalLink />
                        </Link>
                      )}
                      {/* Live url */}
                      {project.githubUrl && (
                        <Link
                          className={style.link}
                          href={project.githubUrl}
                          target='_blank'
                        >
                          <BsGithub />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {/* Tech Stack */}
                <div className={style.techWrapper}>
                  {project.techs.map((tech) => (
                    <p className={style.tech} key={tech}>
                      {tech}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Project;

const style = {
  container:
    "min-h-[400px] pb-[30px] flex flex-wrap px-[20px] gap-8 justify-around items-center shadow-sm shadow-zinc-300 dark:shadow-zinc-700",
  box: "w-[330px]",
  image:
    "w-[330px] shadow-md shadow-zinc-300 dark:shadow-zinc-700 h-48 bg-no-repeat flex flex-col justify-end rounded overflow-hidden bg-cover",
  boxDetails: "bg-red-600 text-center p-1 cursor-pointer",
  linkWrapper:
    "overflow-hidden transition-all duration-500 h-[70px] flex gap-10 justify-center items-center",
  link: "text-xl text-white p-1 bg-gray-700 hover:bg-gray-950 rounded",
  techWrapper: "flex flex-wrap gap-2 mt-4",
  tech: "px-1 text-sm rounded bg-blue-500 text-white",
};
