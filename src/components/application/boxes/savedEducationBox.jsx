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
    setFileInputValue("");
    setEducationArray(educationArray.filter((education, index) => index !== i));
    setEducationForm(educationArray[i]);
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
    <div className='mb-3'>
      <div className='p-2 rounded border border-gray-600 transition-all'>
        <div className='flex gap-3'>
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
      <div className='mt-3 flex justify-between items-center'>
        <div className='flex gap-3'>
          {/* Up Button */}
          {index !== 0 && (
            <button
              className='py-1 px-3 mr-4 font-semibold bg-gray-600 flex items-center gap-2 hover:bg-gray-700 border border-gray-400 rounded'
              onClick={() => moveUp(index)}
              type='button'
            >
              <BiUpArrowAlt />
            </button>
          )}
          {/* Down Button */}
          {index !== educationArray.length - 1 && (
            <button
              className='py-1 px-3 mr-4 font-semibold bg-gray-600 flex items-center gap-2 hover:bg-gray-700 border border-gray-400 rounded'
              onClick={() => moveDown(index)}
              type='button'
            >
              <BiDownArrowAlt />
            </button>
          )}
        </div>
        <div className='flex gap-3'>
          {/* Edit Button */}
          <button
            className='py-1 px-3 mr-4 font-semibold bg-yellow-600 hover:bg-yellow-700 rounded'
            onClick={() => editEducation(index)}
            type='button'
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            className='py-1 px-3 font-semibold bg-red-600 hover:bg-red-700 rounded'
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

