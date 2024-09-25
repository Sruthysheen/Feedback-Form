import React, { useState } from "react";
import "./FeedbackForm.css";

function FeedbackForm() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    contactnumber: "",
    email: "",
    feedback: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [errors, setErrors] = useState({});

  const ratings = [
    { emoji: "😠", label: "Worst" },
    { emoji: "☹️", label: "Not Good" },
    { emoji: "😐", label: "Fine" },
    { emoji: "😃", label: "Look Good" },
    { emoji: "😍", label: "Very Good" },
  ];

  const handleChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (e) => {
    setFormDetails({
      ...formDetails,
      rating: parseInt(e.target.value),
    });
  };

  //Form Validation
  const validateForm = () => {
    const { name, contactnumber, email } = formDetails;
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Z]/.test(name)) {
      newErrors.name = "Name must start with a capital letter.";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Contact number validation
    if (!contactnumber) {
      newErrors.contactnumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(contactnumber)) {
      newErrors.contactnumber = "Contact number must be exactly 10 digits.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const currentDate = new Date().toLocaleDateString();
    setFeedbackList([...feedbackList, { ...formDetails, date: currentDate }]);
    console.log(formDetails);
    setFormDetails({
      name: "",
      contactnumber: "",
      email: "",
      feedback: "",
      rating: 0,
    });
    setErrors({});
  };

  //For slider colour change
  const getSliderBackground = () => {
    const percentage = (formDetails.rating / 4) * 100;
    return `linear-gradient(to right, #115e59 ${percentage}%, #99f6e4 ${percentage}%)`;
  };

  return (
    <>
      <div className="min-h-screen bg-blue-100 flex items-start justify-start">
        <div className="max-w-sm mt-6 flex w-full flex-col border rounded-lg bg-white p-8 ml-9 mb-4">
          <p className="mb-4 leading-relaxed text-sky-600 -mt-5 text-sm">
            Please Provide your Feedback
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="text-sm leading-7 text-sky-600 font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formDetails.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-1 px-3 text-xs leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-gray-700 shadow-md focus:shadow-md"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="contactnumber"
                  className="text-sm leading-7 text-sky-600 font-semibold"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactnumber"
                  name="contactnumber"
                  value={formDetails.contactnumber}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-1 px-3 text-xs leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-gray-700 shadow-md focus:shadow-md"
                  placeholder="00000 00000"
                />
                {errors.contactnumber && (
                  <p className="text-red-500 text-xs">{errors.contactnumber}</p>
                )}
              </div>

              <div className="mb-1">
                <label
                  htmlFor="email"
                  className="text-sm leading-7 text-sky-600 font-semibold"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formDetails.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-1 px-3 text-xs leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-gray-700 shadow-md focus:shadow-md"
                  placeholder="xyz123@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Rating and Slider */}

            <div className="mb-4">
              <label
                htmlFor="rating"
                className="text-sm leading-7 text-sky-600 font-semibold"
              >
                Share your experience in scaling
              </label>

              <div className="flex justify-between mt-2">
                {ratings.map((rate, index) => (
                  <div
                    key={index}
                    className={`text-center ${
                      formDetails.rating === index ? "pointer-events-none" : ""
                    }`}
                  >
                    <span className="text-xl block mb-1">{rate.emoji}</span>
                    <span
                      className={`text-xs font-semibold ${
                        formDetails.rating === index
                          ? "text-teal-600"
                          : "text-teal-500 opacity-50 pointer-events-none"
                      }`}
                    >
                      {rate.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center mb-4 mt-4">
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  id="rating"
                  name="rating"
                  value={formDetails.rating}
                  onChange={handleRatingChange}
                  style={{ background: getSliderBackground() }}
                  className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="mb-4 mt-6">
              <textarea
                id="message"
                name="feedback"
                value={formDetails.feedback}
                onChange={handleChange}
                className="h-20 w-full resize-none rounded-lg border border-gray-300 bg-white py-1 px-3 text-sm leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-gray-700 shadow-md focus:shadow-md"
                placeholder="Add your comments..."
              />
            </div>

            <button className="w-full rounded-lg border-0 bg-teal-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">
              SUBMIT
            </button>
          </form>
        </div>

        {/*Feedback Display */}

        <div className="mt-10 ml-10 w-full max-w-sm">
          <p className="text-md font-bold text-sky-700">Submitted Feedbacks</p>
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback, index) => (
              <div
                key={index}
                className="mt-4 p-4 border rounded-lg bg-white shadow-lg flex"
              >
                <div className="flex-grow">
                  <p className="font-medium text-sm text-sky-600 mb-1">
                    {feedback.feedback}
                  </p>
                  <p className="font-normal text-sm text-sky-600">
                    {feedback.name}
                  </p>
                  <p className="text-xs text-sky-500 mt-4">{feedback.date}</p>
                </div>


                <div className="ml-4 flex-shrink-0 flex flex-col items-center">
                  <span className="text-3xl block mb-1">
                    {ratings[feedback.rating].emoji}
                  </span>
                  <span className="text-xs font-semibold text-green-500 text-center">
                    {ratings[feedback.rating].label}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No feedback submitted yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FeedbackForm;
