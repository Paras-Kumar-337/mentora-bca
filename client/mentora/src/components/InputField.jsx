import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  withDomain = false,      // show dropdown?
  domains = [],            // domain list
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-sm font-semibold text-textMain mb-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center">

        {/* INPUT FIELD */}
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border-2 border-primary rounded-full px-4 py-2 outline-none pr-28 ${
            withDomain ? "rounded-r-" : ""
          }`}
        />

        {/* DOMAIN DROPDOWN */}
        {withDomain && (
          <select
            className="absolute right-0 w-35 h-full bg-primary text-white text-sm rounded-full px-2 outline-none cursor-pointer"
          >
            {domains.map((domain, i) => (
              <option key={i} value={domain}>{domain}</option>
            ))}
          </select>
        )}

        {/* EYE BUTTON FOR PASSWORD */}
        {type === "password" && (
          <span
            className="absolute right-4 cursor-pointer text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        )}

      </div>
    </div>
  );
}