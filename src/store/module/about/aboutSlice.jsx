import {
  Communications2Icon,
  ConnectionsIcon,
  CustomerServiceIcon,
  EventIcon,
  GlobeIcon,
  images,
  InternetAccessIcon,
  SettingsCustomnIcon,
  WifiSecondaryIcon,
} from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: {
    title: "About Us",
    description:
      "We make staying connected effortless, wherever your journey takes you",
    Subdescription: '.As a global brand with a passion for seamless travel, Yoowifi is here to keep you online without limits. Born from the frustration of unreliable, complicated connectivity options, we knew travelers deserved better. Our mission? To deliver simple, reliable, and portable internet solutions that let you focus on your adventures, not your Wifi.'
  },
  whoWeAre: {
    title: "Hey, We're Yoowifi!",
    description:
      "At Yoowifi, powered by UR Communications Pte Ltd, we’ve reimagined how you stay connected on the go with our easy-to-use mobile app and interactive website. Whether you’re exploring new destinations or working across borders, our advanced solutions are designed to keep you online—reliably, affordably, and effortlessly.   \n\nOur mission is simple: to create a world where travelers and telecom experts alike can stay connected without worrying about sky-high roaming fees. With Yoowifi, you can explore, work, and stay close to loved ones, no matter where your journey takes you. It’s connectivity without limits, made just for you.",
    image: "who-we-are-1"//images.whoWeAre1,
  },
  companyMission: {
    title: "Our Company Mission",
    mission: {
      title: "Stay Connected Anytime, Anywhere",
      year: "2001",
      description:
        "Our mission is to deliver accessible, reliable, and boundary-free data services. We strive to empower individuals to stay seamlessly connected with their loved ones while exploring new cultures, experiencing adventures, and navigating diverse corners of the globe, ensuring a seamless and enriching connectivity experience.",
      image: "company-mission-1" //images.companyMission1,
    },
  },
  awardsAndAchievements: {
    details: [
      {
        year: "2024",
        title: "Most Innovative Travel Wi-Fi Solutions Company 2024",
        description: "Awarded by AI Business Excellence Awards",
      },
      {
        year: "2024",
        title: "Singapore's Fastest Growing Companies 2024",
        description: "Awarded by The Straits Times & Statista",
      },
    ],
    images: [
      // images.awards1,
      "awards-1"
      // images.companyMission1,
      // images.whoWeAre1,
    ],
  },
  features: [
    {
      icon: () => (
        <WifiSecondaryIcon className="h-10 w-10 md:h-[60px] md:w-[60px]" />
      ),
      title: "Reliable WiFi, anywhere you go",
    },
    {
      icon: () => <GlobeIcon className="h-10 w-10 md:h-[60px] md:w-[60px]" />,
      title: "Covers more than 160 Countries",
    },
    {
      icon: () => (
        <CustomerServiceIcon className="h-10 w-10 md:h-[60px] md:w-[60px]" />
      ),
      title: "24/7 Customer Support",
    },
    {
      icon: () => (
        <ConnectionsIcon className="h-10 w-10 md:h-[60px] md:w-[60px]" />
      ),
      title: "Local presence in over 10 countries",
    },
  ],
  whatWeDo: [
    {
      icon: () => (
        <InternetAccessIcon className="h-10 w-10 md:h-[60px] md:w-[60px]" />
      ),
      title: "Management Portal",
      description:
        "Our management portal provides a user-friendly platform for seamless control and monitoring, empowering you to manage services efficiently.",
    },
    {
      icon: () => (
        <Communications2Icon className="h-10 w-10 md:h-[60px] md:w-[60px]" />
      ),
      title: "Mobile general solutions",
      description:
        "Our mobile solutions offer reliable, flexible, and cutting-edge services to keep you connected anytime, anywhere, tailored for both personal and business use.",
    },
    {
      icon: () => (
        <SettingsCustomnIcon className="h-10 w-10 md:h-[60px] md:w-[60px]" />
      ),
      title: "Custom solutions",
      description:
        "Discover our custom solutions tailored to meet your unique needs. We work closely with you to design innovative, flexible services that drive success and enhance your business outcomes.",
    },
    {
      icon: () => <EventIcon className="h-10 w-10 md:h-[60px] md:w-[60px]" />,
      title: "Events & Roadshows",
      description:
        "Join us at our exciting events and roadshows, where we present innovative solutions, engage with customers, and shape the future of seamless communication.",
    },
  ],
  personal: [
    {
      _id: 1,
      title: "Global Coverage",
      description:
        "Stay connected across 160 countries, no matter where your journey takes you with Yoowifi's travel wifi services.",
      image: "person-1", //mages.person1,
    },
    {
      _id: 2,
      title: "Flexible Data Plans",
      description:
        "Choose from a variety of flexible data options, allowing you to select the perfect plan based on your usage needs.",
      image: "person-2", //images.person2,
    },
    {
      _id: 3,
      title: "Hassle-Free Delivery",
      description:
        "Enjoy hassle-free delivery with fast, reliable service that gets your order to you with ease and convenience.",
      image: "person-3", //images.person3,
    },
  ],
  business: [
    {
      _id: 1,
      title: "Zero Touch On Demand",
      description:
        "Enjoy seamless, effortless zero-touch, on-demand service tailored to your needs.",
      image: "tour", //images.tour,
    },
    {
      _id: 2,
      title: "Flexible Data Plans",
      description:
        "Flexible data plans for businesses, designed to fit your company's unique needs and usage.",
      image: "data-plan", //images.dataPlan
    },
    {
      _id: 3,
      title: "Multi-homing network",
      description:
        "Ensure uninterrupted connectivity with our multi-homing network, offering multiple connections for enhanced reliability and performance.",
      image: "network", //images.network,
    },
  ],
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
});

export default aboutSlice.reducer;
