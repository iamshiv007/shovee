import { AiFillHtml5 } from "react-icons/ai";
import {
    SiNodedotjs,
    SiNextdotjs,
    SiVercel,
    SiNetlify,
    SiExpress,
    SiRedux,
    SiTailwindcss,
    SiMui,
    SiChakraui,
    SiFirebase,
    SiTypescript,
    SiJquery,
    SiDjango,
    SiGooglecloud,
    SiDotnet,
    SiRust,
    SiKubernetes,
    SiRubyonrails,
    SiJira,
    SiRedis,
    SiJest,
    SiKibana,
    SiJupyter,
    SiClojure,
    SiAdobephotoshop,
    SiDart,
    SiTensorflow,
    SiPytorch,
    SiCircleci,
    SiSocketdotio,
    SiWebrtc,
    SiAndroidstudio,
    SiSqlite
} from "react-icons/si";
import { DiJavascript1, DiReact, DiMongodb, DiSass, DiRuby } from "react-icons/di";
import { BsAndroid2, BsGit, BsGithub, BsWordpress } from "react-icons/bs";
import { FaBootstrap, FaCss3Alt, FaAngular, FaPhp, FaShopify, FaJava, FaAws, FaUnity, FaPython, FaLaravel, FaRobot, FaEthereum } from "react-icons/fa";
import { TbBrandReactNative, TbBrandKotlin, TbBrandFramerMotion, TbCurrencySolana } from "react-icons/tb";
import { GrMysql, GrSwift, GrDocker, GrHeroku } from "react-icons/gr";
import { LiaVuejs } from "react-icons/lia";
import { FaDigitalOcean, FaGolang } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { VscAzure } from "react-icons/vsc";
import { BiLogoPostgresql, BiLogoFlask, BiLogoCPlusPlus } from "react-icons/bi";
import { RiFlutterFill } from "react-icons/ri";

export const TechStackOptions = [
    {
        name: "ReactJS",
        icon: <DiReact className="md:text-4xl text-2xl" color="#53c1de" />,
    },
    {
        name: "JavaScript",
        icon: <DiJavascript1 className="md:text-4xl text-2xl" color="#ffd600" />,
    },
    {
        name: "Redux-toolkit",
        icon: <SiRedux className="md:text-4xl text-2xl" color="#7e57c2" />,
    },
    {
        name: "HTML5",
        icon: <AiFillHtml5 className="md:text-4xl text-2xl" color="#fa6700" />,
    },
    {
        name: "CSS3",
        icon: <FaCss3Alt className="md:text-4xl text-2xl" color={"#039be5"} />,
    },
    {
        name: "Bootstrap",
        icon: <FaBootstrap className="md:text-4xl text-2xl" color="#673ab7" />,
    },
    {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="md:text-4xl text-2xl" color="#4caf50" />,
    },
    {
        name: "Meterial UI",
        icon: <SiMui className="md:text-4xl text-2xl" color="#29b6f6" />,
    },
    {
        name: "Chakra UI",
        icon: <SiChakraui className="md:text-4xl text-2xsl" color="#50cbc0" />
    },
    {
        name: "Vercel",
        icon: <SiVercel className="dark:text-white text-black md:text-4xl text-2xl" />
    },
    {
        name: "Github",
        icon: <BsGithub className="md:text-4xl text-2xl" color="#c9d1d9" />
    },
    {
        name: "NextJS",
        icon: <SiNextdotjs className="md:text-4xl text-2xl dark:text-white text-black" />
    },
    {
        name: "NodeJS",
        icon: <SiNodedotjs className="md:text-4xl text-2xl" color="#4caf50" />,
    },
    {
        name: "Express",
        icon: <SiExpress className="md:text-4xl text-2xl" color="#555555" />,
    },
    {
        name: "MongoDB",
        icon: <DiMongodb className="md:text-4xl text-2xl" color="#4caf50" />,
    },
    {
        name: "firebase",
        icon: <SiFirebase className="md:text-4xl text-2xl" color="#ffcd33" />
    },
    {
        name: "jQuery",
        icon: <SiJquery className="md:text-4xl text-2xsl" color="#106dae" />
    },
    {
        name: "netlify",
        icon: <SiNetlify className="md:text-4xl text-2xl" color={"#31b5ba"} />
    },
    {
        name: "Git",
        icon: <BsGit className="md:text-4xl text-2xl" color="#f4511e" />
    },
    {
        name: "TypeScript",
        icon: <SiTypescript className="md:text-4xl text-2xl" color="#377cc8" />
    },
    {
        name: "Angular",
        icon: <FaAngular className="md:text-4xl text-2xl" color="#c50836" />
    },
    {
        name: "React Native",
        icon: <TbBrandReactNative className="md:text-4xl text-2xl" color="#66dbfb" />
    },
    {
        name: "PHP",
        icon: <FaPhp className="md:text-4xl text-2xl" color="#7b7fb5" />
    },
    {
        name: "JAVA",
        icon: <FaJava className="md:text-4xl text-2xl" color="#547c99" />
    },
    {
        name: "SASS",
        icon: <DiSass className="md:text-4xl text-2xl" color="#f06292" />,
    },
    {
        name: "MySQL",
        icon: <GrMysql className="md:text-4xl text-2xl" color="#08668e" />
    },
    {
        name: "Shopify",
        icon: <FaShopify className="md:text-4xl text-2xl" color="#99c14f" />
    },
    {
        name: "Vue.js",
        icon: <LiaVuejs className="md:text-4xl text-2xl" color="#42b883" />
    },
    {
        name: "Django",
        icon: <SiDjango className="md:text-4xl text-2xl" color="#113527" />
    },
    {
        name: "Ruby on Rails",
        icon: <SiRubyonrails className="md:text-4xl text-2xl" color="#cc0000" />
    },
    {
        name: "Ruby",
        icon: <DiRuby className="md:text-4xl text-2xl" color="#cc0000" />
    },
    {
        name: "AWS",
        icon: <FaAws className="md:text-4xl text-2xl" color="#2d3541" />
    },
    {
        name: "Azure",
        icon: <VscAzure className="md:text-4xl text-2xl" color="#3ab2ec" />
    },
    {
        name: "Google Cloud",
        icon: <SiGooglecloud className="md:text-4xl text-2xl" color="#fbbe0d" />
    },
    {
        name: "Unity",
        icon: <FaUnity className="md:text-4xl text-2xl" color='#29333d' />
    },
    {
        name: ".NET Core",
        icon: <SiDotnet className="md:text-4xl text-2xl" color="#613494" />
    },
    {
        name: "Rust",
        icon: <SiRust className="md:text-4xl text-2xl" color="#cf4732" />
    },
    {
        name: "Kotlin",
        icon: <TbBrandKotlin className="md:text-4xl text-2xl" color="#fd8d2c" />
    },
    {
        name: "Swift",
        icon: <GrSwift className="md:text-4xl text-2xl" color="#fb4c2e" />
    },
    {
        name: "Flutter",
        icon: <RiFlutterFill className="md:text-4xl text-2xl" color="#08c9fa" />
    },
    {
        name: "Kubernetes",
        icon: <SiKubernetes className="md:text-4xl text-2xl" color="#3871e6" />
    },
    {
        name: "Docker",
        icon: <GrDocker className="md:text-4xl text-2xl" color="#0b9ffd" />
    },
    {
        name: "PostgreSQL",
        icon: <BiLogoPostgresql className="md:text-4xl text-2xl" color="#376695" />
    },
    {
        name: "Flask",
        icon: <BiLogoFlask className="md:text-4xl text-2xl text-black dark:text-white" />
    },
    {
        name: "Python",
        icon: <FaPython className="md:text-4xl text-2xl" color="#ffde5a" />
    },
    {
        name: "Laravel",
        icon: <FaLaravel className="md:text-4xl text-2xl" color="#ff3427" />
    },
    {
        name: "Framer Motion",
        icon: <TbBrandFramerMotion className="md:text-4xl text-2xl" color="#670dff" />
    },
    {
        name: "C",
        icon: <BiLogoCPlusPlus className="md:text-4xl text-2xl" color="#3f4fae" />
    },
    {
        name: "C++",
        icon: <BiLogoCPlusPlus className="md:text-4xl text-2xl" color="#3f4fae" />
    },
    {
        name: "Jira",
        icon: <SiJira className="md:text-4xl text-2xl" color="#1971e6" />
    },
    {
        name: "Redis",
        icon: <SiRedis className="md:text-4xl text-2xl" color="#dd3e33" />
    },
    {
        name: "Jest",
        icon: <SiJest className="md:text-4xl text-2xl" color="#c41a2c" />
    },
    {
        name: "Golang",
        icon: <FaGolang className="md:text-4xl text-2xl" color="#6fd8e5" />
    },
    {
        name: "Kibana",
        icon: <SiKibana className="md:text-4xl text-2xl" color="#f0559c" />
    },
    {
        name: "Jupyter Notebook",
        icon: <SiJupyter className="md:text-4xl text-2xl" color="#f37b2d" />
    },
    {
        name: "Clojure",
        icon: <SiClojure className="md:text-4xl text-2xl" color="#94dd4d" />
    },
    {
        name: "Android Studio",
        icon: <SiAndroidstudio className="md:text-4xl text-2xl" color="#4889f4" />
    },
    {
        name: "SQLite",
        icon: <SiSqlite className="md:text-4xl text-2xl" color="#65b7e7" />
    },
    {
        name: "DigitalOcean",
        icon: <FaDigitalOcean className="md:text-4xl text-2xl" color="#0884ff" />
    },
    {
        name: "Wordpress",
        icon: <BsWordpress className="md:text-4xl text-2xl" color="#28799e" />
    },
    {
        name: "Heroku",
        icon: <GrHeroku className="md:text-4xl text-2xl" color="#46089c" />
    },
    {
        name: "Photoshop",
        icon: <SiAdobephotoshop className="md:text-4xl text-2xl" color="#08253c" />
    },
    {
        name: "Dart",
        icon: <SiDart className="md:text-4xl text-2xl" color="#0a5d9e" />
    },
    {
        name: "AI",
        icon: <LuBrainCircuit className="md:text-4xl text-2xl" color="green" />
    },
    {
        name: "Machine Learning",
        icon: <FaRobot className="md:text-4xl text-2xl" color="red" />
    },
    {
        name: "TensorFlow",
        icon: <SiTensorflow className="md:text-4xl text-2xl" color="#ee922b" />
    },
    {
        name: "PyTorch",
        icon: <SiPytorch className="md:text-4xl text-2xl" color="#ef5233" />
    },
    {
        name: "Solana",
        icon: <TbCurrencySolana className="md:text-4xl text-2xl" color="#b155eb" />
    },
    {
        name: "Ethereum",
        icon: <FaEthereum className="md:text-4xl text-2xl" color="#909090" />
    },
    {
        name: "CircleCI",
        icon: <SiCircleci className="md:text-4xl text-2xl text-black dark:text-white" />
    },
    {
        name: "SocketIO",
        icon: <SiSocketdotio className="md:text-4xl text-2xl text-black dark:text-white" />
    },
    {
        name: "WebRTC",
        icon: <SiWebrtc className="md:text-4xl text-2xl text-green" />
    },
]