import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { firstName, lastName, age, phoneNumber, email } = formData;
    if (!firstName || !lastName || !age || !phoneNumber || !email) {
      toast.error("All fields are required!");
      return false;
    }
    if (isNaN(age) || age <= 0) {
      toast.error("Age must be a positive number!");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // API call to create user
      fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("User created successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            age: "",
            phoneNumber: "",
            email: "",
          });
          console.log(data);
        })
        .catch((err) => {
          toast.error("Failed to create user. Please try again.");
          console.error(err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Header />
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-20">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create User Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstName", "lastName", "age", "phoneNumber", "email"].map(
            (field, index) => (
              <div key={index}>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
