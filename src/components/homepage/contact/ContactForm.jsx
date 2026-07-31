import { isValidEmail } from "@/utils/check-email";
import { personalData } from "@/utils/data/personal-data";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    const serviceID = "service_nbxhsvg";
    const templateID = "template_ra2b0es";
    const options = { publicKey: "hk7bjDtn5sTjH7T7J" };

    try {
      const res = await emailjs.send(
        serviceID,
        templateID,
        { ...input, to_email: personalData.email },
        options
      );

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error?.text || error);
    }
  };

  return (
    <div className="">
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase tracking-widest">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-xl glass-panel p-3 lg:p-6">
        <p className="text-sm text-gray-400 leading-relaxed">
          {
            "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."
          }
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Your Name: </label>
            <input
              className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] focus:shadow-[0_0_20px_rgba(22,242,179,0.3)] ring-0 outline-0 transition-all duration-300 px-4 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              onBlur={checkRequired}
              value={input.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Your Email: </label>
            <input
              className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] focus:shadow-[0_0_20px_rgba(22,242,179,0.3)] ring-0 outline-0 transition-all duration-300 px-4 py-2"
              type="email"
              maxLength="100"
              required={true}
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(input.email) });
              }}
            />
            {error.email && (
              <p className="text-sm text-red-400">
                Please provide a valid email!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Your Message: </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] focus:shadow-[0_0_20px_rgba(22,242,179,0.3)] ring-0 outline-0 transition-all duration-300 px-4 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={input.message}
            />
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            {error.required && (
              <p className="text-sm text-red-400">
                Email and Message are required!
              </p>
            )}
            <button
              className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-8 md:px-12 py-3 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:text-white md:font-semibold"
              role="button"
              onClick={handleSendMail}
            >
              <span>Send Message</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
