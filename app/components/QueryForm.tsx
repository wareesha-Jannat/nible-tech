"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormType, contactSchema } from "@/lib/validations/contact";
import { Loader2 } from "lucide-react";
import { useFeaturedServices } from "@/hooks/useFeaturedServices";

type Props = {
  defaultValues?: ContactFormType;
  onSubmit: (data: ContactFormType) => Promise<boolean>;
  submitText?: string;
  className?: string; // 🔥 for border customization
};

const QueryForm = ({
  defaultValues,
  onSubmit,
  submitText = "Submit",
  className = "",
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const { data: services, isLoading } = useFeaturedServices();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLElement;

    // ❌ Allow Enter in textarea
    if (target.tagName === "TEXTAREA") return;

    // ❌ Prevent form submit
    e.preventDefault();

    const form = target.closest("form");
    if (!form) return;

    const focusable = Array.from(
      form.querySelectorAll<HTMLElement>("input, select, textarea, button"),
    ).filter((el) => !el.hasAttribute("disabled"));

    const index = focusable.indexOf(target);
    const next = focusable[index + 1];

    if (next) next.focus();
  };

  const handleFormSubmit = async (data: ContactFormType) => {
    const success = await onSubmit(data);

    if (success && !defaultValues) {
      reset(); // only reset for CREATE mode
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`space-y-4 rounded-xl ${className}`}
    >
      {/* Name */}
      <div>
        <label className="text-sm font-medium text-gray-600">Full Name *</label>
        <input
          type="text"
          placeholder="John Doe"
          onKeyDown={handleKeyDown}
          className={`w-full mt-2 px-4 py-3 rounded-lg border ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          } outline-none transition`}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-gray-600">Email *</label>
        <input
          type="email"
          placeholder="john@email.com"
          onKeyDown={handleKeyDown}
          className={`w-full mt-2 px-4 py-3 rounded-lg border ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          } outline-none transition`}
          {...register("email")}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium text-gray-600">Phone</label>
        <input
          type="text"
          placeholder="+92 300 1234567"
          onKeyDown={handleKeyDown}
          className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          {...register("phone")}
        />
      </div>

      {/* Project */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          Project Type *
        </label>
        <select
          onKeyDown={handleKeyDown}
          className={`w-full mt-2 px-4 py-3 rounded-lg border ${
            errors.projectType
              ? "border-red-500"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
          } outline-none transition`}
          {...register("projectType")}
        >
          <option value="">Select a service</option>
          {isLoading && <option disabled>Loading services...</option>}

          {services?.map((service) => (
            <option key={service._id} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.projectType.message}
          </p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          Estimated Budget *
        </label>
        <select
          onKeyDown={handleKeyDown}
          className={`w-full mt-2 px-4 py-3 rounded-lg border ${
            errors.budget
              ? "border-red-500"
              : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          } outline-none transition`}
          {...register("budget")}
        >
          <option value="">Select budget</option>
          <option value="< $1k">&lt; $1k</option>
          <option value="$1k – $5k">$1k – $5k</option>
          <option value="$5k – $10k">$5k – $10k</option>
          <option value="$10k+">$10k+</option>
        </select>
      </div>

      {/* Timeline */}
      <div>
        <label className="text-sm font-medium text-gray-600">Timeline</label>
        <select
          onKeyDown={handleKeyDown}
          className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          {...register("timeline")}
        >
          <option value="">Select timeline</option>
          <option value="ASAP">ASAP</option>
          <option value="1–2 Months">1–2 Months</option>
          <option value="3+ Months">3+ Months</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="text-sm font-medium text-gray-600">Message *</label>
        <textarea
          rows={4}
          placeholder="Tell us about your project..."
          onKeyDown={handleKeyDown}
          className={`w-full mt-2 px-4 py-3 rounded-lg border ${
            errors.message
              ? "border-red-500"
              : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          } outline-none transition resize-none`}
          {...register("message")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        onKeyDown={handleKeyDown}
        className="w-full py-2 rounded-xl flex items-center justify-center gap-2  font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          submitText
        )}
      </button>
    </form>
  );
};

export default QueryForm;
