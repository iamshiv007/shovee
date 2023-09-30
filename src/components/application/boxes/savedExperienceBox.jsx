import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

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
    <div className='mb-3'>
      {/* Experience Details */}
      <div className='p-2 rounded border border-gray-600 transition-all'>
        <p>Company Name : {companyName}</p>
        <p>Location : {location}</p>
        <p>Job Role : {role}</p>
        <p>Time Period : {jobPeriod}</p>
        {details && <p>Details : {details}</p>}
      </div>
      <div className='mt-3 flex justify-between items-center'>
        <div className='flex gap-3'>
          {/* Up Button */}
          {index !== 0 && (
            <button
              className='py-1 px-3 mr-4 font-semibold bg-gray-600 flex items-center gap-2 hover:bg-gray-700 border border-gray-400 rounded'
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
              className='py-1 px-3 mr-4 font-semibold bg-gray-600 flex items-center gap-2 hover:bg-gray-700 border border-gray-400 rounded'
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
        <div className='flex gap-3'>
          <button
            className='py-1 px-3 mr-4 font-semibold bg-yellow-600 hover:bg-yellow-700 rounded'
            onClick={() => editExperience(index)}
            type='button'
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            className='py-1 px-3 font-semibold bg-red-600 hover:bg-red-700 rounded'
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
