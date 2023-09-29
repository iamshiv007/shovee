import { combineReducers } from "@reduxjs/toolkit";

import homeReducer from "./reducers/homeReducer";
import homeDataReducer from "./reducers/homeDataReducer";
import sameFirstNameDataReducer from "./reducers/sameFirstNameDataReducer";
import aboutReducer from "./reducers/aboutReducer";
import aboutDataReducer from "./reducers/aboutDataReducer";
import techstackReducer from "./reducers/techStackReducer";
import techStackDataReducer from "./reducers/techStackDataReducer";
import educationReducer from "./reducers/educationReducer";
import educationDataReducer from "./reducers/educationDataReducer";
import experienceReducer from "./reducers/experienceReducer";
import experienceDataReducer from "./reducers/experienceDataReducer";
import projectReducer from "./reducers/projectReducer";
import projectDataReducer from "./reducers/projectDataReducer";
import mailReducer from "./reducers/mailReducer";

const rootReducer = combineReducers({
    home: homeReducer,
    homeData: homeDataReducer,
    sameFirstNameData: sameFirstNameDataReducer,
    about: aboutReducer,
    aboutData: aboutDataReducer,
    techStack: techstackReducer,
    techStackData: techStackDataReducer,
    education: educationReducer,
    educationData: educationDataReducer,
    experience: experienceReducer,
    experienceData: experienceDataReducer,
    project: projectReducer,
    projectData: projectDataReducer,
    mail: mailReducer
})

export default rootReducer