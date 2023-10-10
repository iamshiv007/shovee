import Image from "next/image";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

export const SavedEducationBox = ({
  degree,
  educationArray,
  index,
  institution,
  institutionImagePreview,
  setEducationArray,
  setEducationForm,
  setFileInputValue,
  status,
  studyPeriod,
}) => {
  // Delete Education
  const deleteEducation = (i) => {
    setEducationArray(educationArray.filter((education, index) => index !== i));
  };

  //   Edit Education
  const editEducation = (i) => {
    if (setFileInputValue) setFileInputValue("");
    setEducationArray(educationArray.filter((education, index) => index !== i));
    setEducationForm(educationArray[i]);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling animation
    });
  };

  //   Move Up Education
  const moveUp = (i) => {
    if (i === 0) {
      return;
    }
    let newEducationArray = [...educationArray];
    newEducationArray[i] = educationArray[i - 1];
    newEducationArray[i - 1] = educationArray[i];

    setEducationArray(newEducationArray);
  };

  //   Move Down Education
  const moveDown = (i) => {
    if (i === educationArray.length - 1) {
      return;
    }

    let newEducationArray = [...educationArray];
    newEducationArray[i] = educationArray[i + 1];
    newEducationArray[i + 1] = educationArray[i];

    setEducationArray(newEducationArray);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.flexContainer}>
          {/* Institution Image */}
          {institutionImagePreview && (
            <div>
              <Image
                alt='institution image'
                height={150}
                src={institutionImagePreview || "/images/noImage.png"}
                width={150}
              />
            </div>
          )}
          {/* Education Details */}
          <div>
            <p>Degree : {degree}</p>
            <p>Institution : {institution}</p>
            {studyPeriod && <p>Year : {studyPeriod}</p>}
            {status && <p>Status : {status}</p>}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroup}>
          {/* Up Button */}
          {index !== 0 && (
            <button
              className={styles.arrowBtn}
              onClick={() => moveUp(index)}
              type='button'
            >
              <BiUpArrowAlt />
            </button>
          )}
          {/* Down Button */}
          {index !== educationArray.length - 1 && (
            <button
              className={styles.arrowBtn}
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
            onClick={() => editEducation(index)}
            type='button'
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            className={styles.deleteBtn}
            onClick={() => deleteEducation(index)}
            type='button'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const styles = {
  container: "mb-3",
  card: "p-2 rounded border border-gray-600 transition-all",
  flexContainer: "flex gap-3",
  buttonContainer: "mt-3 flex justify-between items-center",
  buttonGroup: "flex gap-3",
  arrowBtn:
    "py-1 px-3 mr-4 font-semibold bg-gray-600 flex items-center gap-2 hover:bg-gray-700 border border-gray-400 rounded",
  editBtn:
    "py-1 px-3 mr-4 font-semibold bg-yellow-600 hover:bg-yellow-700 rounded",
  deleteBtn: "py-1 px-3 font-semibold bg-red-600 hover:bg-red-700 rounded",
};
