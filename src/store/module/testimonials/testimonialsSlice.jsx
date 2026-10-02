import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    description:
      "Using this eSIM service for the past six months has completely transformed our approach to managing connectivity for our projects!",
    author: "Sarah Johnson",
    designation: "CEO, TechWave Solutions",
    image:
      "https://images.unsplash.com/photo-1579038773867-044c48829161?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isHighlighted: true,
  },
  {
    id: 2,
    description:
      "This platform has been a game-changer for our international projects, making it easier to stay connected without the usual hassles.",
    author: "Michael Lee",
    designation: "Project Manager, GlobalConnect",
    image:
      "https://images.unsplash.com/photo-1579038773867-044c48829161?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isHighlighted: false,
  },
  {
    id: 3,
    description:
      "The ease of use and flexibility offered by this service has allowed us to focus on what matters most—our work!",
    author: "Emily Davis",
    designation: "COO, Innovatech",
    image:
      "https://images.unsplash.com/photo-1579038773867-044c48829161?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isHighlighted: false,
  },
  {
    id: 4,
    description:
      "We've seen significant cost savings since switching to this eSIM solution. It's a smart choice for any business working globally.",
    author: "James Taylor",
    designation: "CFO, FinEdge",
    image:
      "https://images.unsplash.com/photo-1579038773867-044c48829161?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isHighlighted: false,
  },
  {
    id: 5,
    description:
      "Reliable connectivity is crucial for us, and this service has delivered beyond our expectations. Highly recommended!",
    author: "Sophia Martinez",
    designation: "Head of Operations, TransLogix",
    image:
      "https://images.unsplash.com/photo-1579038773867-044c48829161?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isHighlighted: false,
  },
];

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    toggleHighlight: (state, action) => {
      const testimonial = state.find((item) => item.id === action.payload);
      if (testimonial) {
        testimonial.isHighlighted = !testimonial.isHighlighted;
      }
    },
    addTestimonial: (state, action) => {
      state.push(action.payload);
    },
    removeTestimonial: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { toggleHighlight, addTestimonial, removeTestimonial } =
  testimonialsSlice.actions;
export default testimonialsSlice.reducer;
