import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

import { styles } from "./savedEducationBox";

export const SavedExperienceBox = ({
  companyName,
  experienceArray,
  index,
  location,
  setExperienceArray,
  setExperienceForm,
  role,
  jobPeriod,
  details,
}) => {
  // Delete Experience
  const deleteExperience = (i) => {
    setExperienceArray(
      experienceArray.filter((experience, index) => index !== i)
    );
  };

  // Edit Experience
  const editExperience = (i) => {
    setExperienceArray(
      experienceArray.filter((experience, index) => index !== i)
    );
    setExperienceForm(experienceArray[i]);
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
    let newExperienceArray = [...experienceArray];
    newExperienceArray[i] = experienceArray[i - 1];
    newExperienceArray[i - 1] = experienceArray[i];

    setExperienceArray(newExperienceArray);
  };

  // Move Down
  const moveDown = (i) => {
    if (i === experienceArray.length - 1) {
      return;
    }

    let newExperienceArray = [...experienceArray];
    newExperienceArray[i] = experienceArray[i + 1];
    newExperienceArray[i + 1] = experienceArray[i];

    setExperienceArray(newExperienceArray);
  };

  return (
    <div className={styles.container}>
      {/* Experience Details */}
      <div className={styles.card}>
        <p>Company Name : {companyName}</p>
        <p>Location : {location}</p>
        <p>Job Role : {role}</p>
        <p>Time Period : {jobPeriod}</p>
        {details && <p>Details : {details}</p>}
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroup}>
          {/* Up Button */}
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
          {/* Down Button */}
          {index !== experienceArray.length - 1 && (
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
        {/* Edit Button */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.editBtn}
            onClick={() => editExperience(index)}
            type='button'
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            className={styles.deleteBtn}
            onClick={() => deleteExperience(index)}
            type='button'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
