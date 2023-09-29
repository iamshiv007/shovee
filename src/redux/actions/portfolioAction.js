import axios from "axios";

import { getHomeFailed, getHomeRequest, getHomeSuccess } from "../reducers/homeDataReducer";
import { newHomeFailed, newHomeRequest, newHomeSuccess, updateHomeFailed, updateHomeRequest, updateHomeSuccess } from "../reducers/homeReducer";
import { getSameFirstNameFailed, getSameFirstNameRequest, getSameFirstNameSuccess } from "../reducers/sameFirstNameDataReducer";
import { deleteAboutFailed, deleteAboutRequest, deleteAboutSuccess, newAboutFailed, newAboutRequest, newAboutSuccess, updateAboutFailed, updateAboutRequest, updateAboutSuccess } from "../reducers/aboutReducer";
import { getAboutFailed, getAboutRequest, getAboutSuccess } from "../reducers/aboutDataReducer";
import { deleteTechStackFailed, deleteTechStackRequest, deleteTechStackSuccess, newTechStackFailed, newTechStackRequest, newTechStackSuccess, updateTechStackFailed, updateTechStackRequest, updateTechStackSuccess } from "../reducers/techStackReducer";
import { getTechStackFailed, getTechStackRequest, getTechStackSuccess } from "../reducers/techStackDataReducer";
import { deleteEducationFailed, deleteEducationRequest, deleteEducationSuccess, newEducationFailed, newEducationRequest, newEducationSuccess, updateEducationFailed, updateEducationRequest, updateEducationSuccess } from "../reducers/educationReducer";
import { getEducationFailed, getEducationRequest, getEducationSuccess } from "../reducers/educationDataReducer";
import { deleteExperienceFailed, deleteExperienceRequest, deleteExperienceSuccess, newExperienceFailed, newExperienceRequest, newExperienceSuccess, updateExperienceFailed, updateExperienceRequest, updateExperienceSuccess } from "../reducers/experienceReducer";
import { getExperienceFailed, getExperienceRequest, getExperienceSuccess } from "../reducers/experienceDataReducer";
import { deleteProjectFailed, deleteProjectRequest, deleteProjectSuccess, newProjectFailed, newProjectRequest, newProjectSuccess, updateProjectFailed, updateProjectRequest, updateProjectSuccess } from "../reducers/projectReducer";
import { getProjectFailed, getProjectRequest, getProjectSuccess } from "../reducers/projectDataReducer";

// 1. Create new home
export const createHome = (formData) => async (dispatch) => {
    dispatch(newHomeRequest());

    try {
        const { data } = await axios.post(
            "/api/portfolio/post/home/", formData
        );

        dispatch(newHomeSuccess(data));
    } catch (error) {
        dispatch(
            newHomeFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 2. Get home data by userId (user authenticated)
export const authGetHome = (userId) => async (dispatch) => {
    dispatch(getHomeRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/home/userId/${userId}`
        );

        dispatch(getHomeSuccess(data));
    } catch (error) {
        dispatch(
            getHomeFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 3. Update home
export const updateHome = (id, formData) => async (dispatch) => {
    dispatch(updateHomeRequest());

    const { data } = await axios.put(`/api/portfolio/update/home/${id}`, formData);
    try {

        dispatch(updateHomeSuccess(data));

    } catch (error) {
        dispatch(
            updateHomeFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 4. Get home data by userName (user not authenticated)
export const getHome = (userName) => async (dispatch) => {
    dispatch(getHomeRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/home/userName/${userName}`
        );

        dispatch(getHomeSuccess(data));
    } catch (error) {
        dispatch(
            getHomeFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 5. Get all users with selected firstname
export const getSameFirstName = (firstName) => async (dispatch) => {
    dispatch(getSameFirstNameRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/firstName/${firstName}`
        );

        dispatch(getSameFirstNameSuccess(data));
    } catch (error) {
        dispatch(
            getSameFirstNameFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
}

// 6. Create new about data
export const createAbout = (formData) => async (dispatch) => {
    dispatch(newAboutRequest());

    try {
        const { data } = await axios.post(
            "/api/portfolio/post/about/", formData
        );

        dispatch(newAboutSuccess(data));
    } catch (error) {
        dispatch(
            newAboutFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 7. Get about data by userId (authenticated)
export const authGetAbout = (userId) => async (dispatch) => {
    dispatch(getAboutRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/about/userId/${userId}`
        );

        dispatch(getAboutSuccess(data));
    } catch (error) {
        dispatch(
            getAboutFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 8. update about data
export const updateAbout = (id, aboutForm) => async (dispatch) => {
    dispatch(updateAboutRequest());
    const { image } = aboutForm

    try {
        if (image) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                // Image uploaded successfully
                const data2 = await response.json();
                // Create a new object with the updated image property
                const updatedAboutForm = { ...aboutForm, image: { imageUrl: data2.url, publicId: data2.public_id } };

                // Assign the updated object to aboutForm
                aboutForm = updatedAboutForm;
            } else {
                // Handle error
                dispatch(updateAboutFailed("Image upload failed"))
                throw new Error("Image upload failed");
            }

        }
        const { data } = await axios.put(`/api/portfolio/update/about/${id}`, aboutForm);

        dispatch(updateAboutSuccess(data));

    } catch (error) {
        dispatch(
            updateAboutFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 9. delete about data
export const deleteAbout = (id) => async (dispatch) => {
    dispatch(deleteAboutRequest());

    try {

        const { data } = await axios.delete(`/api/portfolio/delete/about/${id}`);

        dispatch(deleteAboutSuccess(data));

    } catch (error) {
        dispatch(
            deleteAboutFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 10. Get about data by userName (Not authenticated)
export const getAbout = (userName) => async (dispatch) => {
    dispatch(getAboutRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/about/userName/${userName}`
        );

        dispatch(getAboutSuccess(data));
    } catch (error) {
        dispatch(
            getAboutFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 11. Create new teckStack
export const createTechStack = (formData) => async (dispatch) => {
    dispatch(newTechStackRequest());

    try {
        const { data } = await axios.post(
            "/api/portfolio/post/techStack/", formData
        );

        dispatch(newTechStackSuccess(data));
    } catch (error) {
        dispatch(
            newTechStackFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 12. Get techStack data by userId (user authenticated)
export const authGetTechStack = (userId) => async (dispatch) => {
    dispatch(getTechStackRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/techStack/userId/${userId}`
        );

        dispatch(getTechStackSuccess(data));
    } catch (error) {
        dispatch(
            getTechStackFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 13. Update techStack
export const updateTechStack = (id, formData) => async (dispatch) => {
    dispatch(updateTechStackRequest());

    const { data } = await axios.put(`/api/portfolio/update/techStack/${id}`, formData);
    try {

        dispatch(updateTechStackSuccess(data));

    } catch (error) {
        dispatch(
            updateTechStackFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 14. Delete techStack
export const deleteTechStack = (id) => async (dispatch) => {
    dispatch(deleteTechStackRequest());

    const { data } = await axios.delete(`/api/portfolio/delete/techStack/${id}`);
    try {

        dispatch(deleteTechStackSuccess(data));

    } catch (error) {
        dispatch(
            deleteTechStackFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 15. Get techStack data by userName (user not authenticated)
export const getTechStack = (userName) => async (dispatch) => {
    dispatch(getTechStackRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/techStack/userName/${userName}`
        );

        dispatch(getTechStackSuccess(data));
    } catch (error) {
        dispatch(
            getTechStackFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 16. Create new education
export const createEducation = (formData) => async (dispatch) => {
    dispatch(newEducationRequest());

    try {
        const { data } = await axios.post(
            "/api/portfolio/post/education/", formData
        );

        dispatch(newEducationSuccess(data));
    } catch (error) {
        dispatch(
            newEducationFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 17. Get education data by userId (user authenticated)
export const authGetEducation = (userId) => async (dispatch) => {
    dispatch(getEducationRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/education/userId/${userId}`
        );

        dispatch(getEducationSuccess(data));
    } catch (error) {
        dispatch(
            getEducationFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 18. Update education
export const updateEducation = (id, formData) => async (dispatch) => {
    dispatch(updateEducationRequest());

    try {
        const updatedEducations = await Promise.all(formData?.educations?.map(async (education) => {
            if (education.institutionImageFile) {
                const formData = new FormData()
                formData.append("file", education.institutionImageFile)
                formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET)

                const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    })
                if (response.ok) {
                    const data2 = await response.json()
                    const updatedInstitutionImage = { ...education.institutionImage, imageUrl: data2.url, publicId: data2.public_id }
                    const updatedEducation = { ...education, institutionImage: updatedInstitutionImage }

                    return updatedEducation
                } else {
                    dispatch(updateEducationFailed("Image upload failed"))
                    // Stop the update process by throwing an error
                    throw new Error("Image upload failed");
                }
            }
            return education
        }))

        const updatedFormData = { ...formData, educations: updatedEducations }

        const { data } = await axios.put(`/api/portfolio/update/education/${id}`, updatedFormData);

        dispatch(updateEducationSuccess(data));

    } catch (error) {
        dispatch(
            updateEducationFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 19. Delete education
export const deleteEducation = (id) => async (dispatch) => {
    dispatch(deleteEducationRequest());

    try {

        const { data } = await axios.delete(`/api/portfolio/delete/education/${id}`);

        dispatch(deleteEducationSuccess(data));

    } catch (error) {
        dispatch(
            deleteEducationFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 20. Get education data by userName (user not authenticated)
export const getEducation = (userName) => async (dispatch) => {
    dispatch(getEducationRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/education/userName/${userName}`
        );

        dispatch(getEducationSuccess(data));
    } catch (error) {
        dispatch(
            getEducationFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 21. Create new experience
export const createExperience = (formData) => async (dispatch) => {
    dispatch(newExperienceRequest());

    try {
        const { data } = await axios.post(
            "/api/portfolio/post/experience/", formData
        );

        dispatch(newExperienceSuccess(data));
    } catch (error) {
        dispatch(
            newExperienceFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 22. Get experience data by userId (user authenticated)
export const authGetExperience = (userId) => async (dispatch) => {
    dispatch(getExperienceRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/experience/userId/${userId}`
        );

        dispatch(getExperienceSuccess(data));
    } catch (error) {
        dispatch(
            getExperienceFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 23. Update experience
export const updateExperience = (id, formData) => async (dispatch) => {
    dispatch(updateExperienceRequest());

    const { data } = await axios.put(`/api/portfolio/update/experience/${id}`, formData);
    try {

        dispatch(updateExperienceSuccess(data));

    } catch (error) {
        dispatch(
            updateExperienceFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 24. Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    dispatch(deleteExperienceRequest());

    const { data } = await axios.delete(`/api/portfolio/delete/experience/${id}`);
    try {

        dispatch(deleteExperienceSuccess(data));

    } catch (error) {
        dispatch(
            deleteExperienceFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 25. Get experience data by userName (user not authenticated)
export const getExperience = (userName) => async (dispatch) => {
    dispatch(getExperienceRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/experience/userName/${userName}`
        );

        dispatch(getExperienceSuccess(data));
    } catch (error) {
        dispatch(
            getExperienceFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 26. Create new project
export const createProject = (formData) => async (dispatch) => {
    dispatch(newProjectRequest());

    try {
        const { data } = await axios.post(
            "/api/portfolio/post/project/", formData
        );

        dispatch(newProjectSuccess(data));
    } catch (error) {
        dispatch(
            newProjectFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 27. Get project data by userId (user authenticated)
export const authGetProject = (userId) => async (dispatch) => {
    dispatch(getProjectRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/project/userId/${userId}`
        );

        dispatch(getProjectSuccess(data));
    } catch (error) {
        dispatch(
            getProjectFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 28. Update project
export const updateProject = (id, formData) => async (dispatch) => {
    dispatch(updateProjectRequest());

    const updatedProjects = await Promise.all(formData?.projects?.map(async (project) => {
        if (project.projectImageFile) {
            const formData = new FormData();
            formData.append("file", project.projectImageFile);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                const data2 = await response.json()
                // Create a new object with the updated imageUrl and publicId
                const updatedProjectImage = {
                    ...project.projectImage,
                    imageUrl: data2.url,
                    publicId: data2.public_id,
                };

                // Create a new project object with the updated projectImage
                const updatedProject = {
                    ...project,
                    projectImage: updatedProjectImage,
                };
                return updatedProject
            } else {
                dispatch(updateProjectFailed("Image upload failed"))
                // Stop the update process by throwing an error
                throw new Error("Image upload failed");
            }
        }
        return project
    }))
    const updatedFormData = { ...formData, projects: updatedProjects };

    const { data } = await axios.put(`/api/portfolio/update/project/${id}`, updatedFormData);
    try {

        dispatch(updateProjectSuccess(data));

    } catch (error) {
        dispatch(
            updateProjectFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 29. delete project
export const deleteProject = (id) => async (dispatch) => {
    dispatch(deleteProjectRequest());

    const { data } = await axios.delete(`/api/portfolio/delete/project/${id}`);
    try {

        dispatch(deleteProjectSuccess(data));

    } catch (error) {
        dispatch(
            deleteProjectFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 30. Get project data by userName (user not authenticated)
export const getProject = (userName) => async (dispatch) => {
    dispatch(getProjectRequest());

    try {
        const { data } = await axios.get(
            `/api/portfolio/get/project/userName/${userName}`
        );

        dispatch(getProjectSuccess(data));
    } catch (error) {
        dispatch(
            getProjectFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};
