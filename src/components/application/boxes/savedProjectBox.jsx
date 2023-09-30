import Image from "next/image";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

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
    setFileInputValue("");
    setProjectArray(projectArray.filter((project, index) => index !== i));
    setProjectForm(projectArray[i]);
    scrollTo(0, 0);
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
    <div className='mb-3'>
      <div className='p-2 rounded border border-gray-600 transition-all'>
        <div className='flex gap-3'>
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
      <div className='mt-3 flex justify-between items-center'>
        <div className='flex gap-3'>
          {/* Arrow Up */}
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

          {/* Arrow Down */}
          {index !== projectArray.length - 1 && (
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
        <div className='flex gap-3'>
          {/* Edit Button */}
          <button
            className='py-1 px-3 mr-4 font-semibold bg-yellow-600 hover:bg-yellow-700 rounded'
            onClick={() => editProject(index)}
            type='button'
          >
            Edit
          </button>
          {/* Delete Button */}
          <button
            className='py-1 px-3 font-semibold bg-red-600 hover:bg-red-700 rounded'
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
