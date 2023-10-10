import Image from "next/image";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

import { styles } from "./savedEducationBox";

export const SavedProjectBox = ({
  projectName,
  projectArray,
  index,
  setFileInputValue,
  setProjectArray,
  setProjectForm,
  liveUrl,
  githubUrl,
  projectImagePreview,
  techs,
}) => {
  // Delete Project
  const deleteProject = (i) => {
    setProjectArray(projectArray.filter((project, index) => index !== i));
  };

  // Edit Project
  const editProject = (i) => {
    if (setFileInputValue) setFileInputValue("");
    setProjectArray(projectArray.filter((project, index) => index !== i));
    setProjectForm(projectArray[i]);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling animation
    });
  };

  // Move Up
  const moveUp = (i) => {
    if (i === 0) {
      return;
    }
    let newProjectArray = [...projectArray];
    newProjectArray[i] = projectArray[i - 1];
    newProjectArray[i - 1] = projectArray[i];

    setProjectArray(newProjectArray);
  };

  // Move Down
  const moveDown = (i) => {
    if (i === projectArray.length - 1) {
      return;
    }

    let newProjectArray = [...projectArray];
    newProjectArray[i] = projectArray[i + 1];
    newProjectArray[i + 1] = projectArray[i];

    setProjectArray(newProjectArray);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.flexContainer}>
          {/* Image Preview */}
          {projectImagePreview && (
            <div>
              <Image
                alt='project image'
                height={150}
                src={projectImagePreview || "/images/noImage.png"}
                width={150}
              />
            </div>
          )}
          {/* Project Details */}
          <div>
            <p>Project Name : {projectName}</p>
            {liveUrl && <p>Live Url : {liveUrl}</p>}
            {githubUrl && <p>Github Url : {githubUrl}</p>}
            {techs?.length !== 0 && <p>Techs: {techs?.join(", ")}</p>}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroup}>
          {/* Arrow Up */}
          {index !== 0 && (
            <button
              className={styles.arrowBtn}
              data-tooltip-content='Move Up'
              data-tooltip-id='my-tooltip'
              data-tooltip-place='left'
              onClick={() => moveUp(index)}
              type='button'
            >
              <BiUpArrowAlt />
            </button>
          )}

          {/* Arrow Down */}
          {index !== projectArray.length - 1 && (
            <button
              className={styles.arrowBtn}
              data-tooltip-content='Move Down'
              data-tooltip-id='my-tooltip'
              data-tooltip-place='right'
              onClick={() => moveDown(index)}
              type='button'
            >
              <BiDownArrowAlt />
            </button>
          )}
        </div>
        <div className={styles.buttonGroup}>
          {/* Edit Button */}
          <button
            className={styles.editBtn}
            onClick={() => editProject(index)}
            type='button'
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            className={styles.deleteBtn}
            onClick={() => deleteProject(index)}
            type='button'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
