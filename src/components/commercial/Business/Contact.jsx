import React from "react";

export default function Contact() {
  return (
    <section
      className="bg-white pt-[74px] pb-[84px] px-0 max-[680px]:py-[60px]"
      id="contact"
    >
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-[680px]:w-[calc(100%-28px)]">
        <div className="grid grid-cols-[0.9fr_1.1fr] max-[1000px]:grid-cols-1 gap-14 items-start">
          <div>
            <span className="inline-flex items-center gap-2.5 bg-[#fff0f1] text-[#ee1b24] text-[12px] font-black tracking-[0.08em] uppercase py-2.25 px-3.5 rounded-full">
              Contact Sales
            </span>
            <h2 className="text-[clamp(36px,4vw,54px)] leading-[1.02] tracking-[-0.055em] mt-4 mb-4 mx-0 font-bold">
              Let's build a global scaling trajectory together
            </h2>
            <p className="text-[#555] text-[17px] mt-0 mb-6.5 max-w-[520px]">
              Tell us about your business infrastructure needs, target
              footprint, and estimated capacity needs. Our engineering unit will
              follow up shortly.
            </p>

            <div className="grid gap-3.5 mt-[30px]">
              <div className="flex gap-3.5 items-start">
                <span className="w-11 h-11 rounded-[14px] bg-[#fff0f1] text-[#ee1b24] grid place-items-center text-[22px] flex-none">
                  ☏
                </span>
                <div>
                  <b className="block mb-1 font-bold">WhatsApp Us</b>
                  <small className="text-[#666] text-[14px] font-normal">
                    (+65) 6100 9998
                  </small>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-11 h-11 rounded-[14px] bg-[#fff0f1] text-[#ee1b24] grid place-items-center text-[22px] flex-none">
                  ✉
                </span>
                <div>
                  <b className="block mb-1 font-bold">Email Address</b>
                  <small className="text-[#666] text-[14px] font-normal">
                    hello@yoowifi.com
                  </small>
                </div>
              </div>
              <div className="flex gap-3.5 items-start">
                <span className="w-11 h-11 rounded-[14px] bg-[#fff0f1] text-[#ee1b24] grid place-items-center text-[22px] flex-none">
                  ◎
                </span>
                <div>
                  <b className="block mb-1 font-bold">What happens next?</b>
                  <small className="text-[#666] text-[14px] font-normal">
                    Tell us about your business needs and our team will get back
                    to you soon.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <form
            className="bg-[#f6f6f6] rounded-[26px] p-[30px] border border-[#eee] shadow-[0_20px_55px_rgba(0,0,0,0.07)]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 max-[680px]:grid-cols-1 gap-4">
              <div className="grid gap-1.5">
                <label className="text-[12px] font-black text-[#333]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-100% border border-[#e3e3e3] bg-white rounded-[18px] py-3.5 px-4 text-[14px] outline-none transition-all focus:border-[#ee1b24] focus:shadow-[0_0_0_4px_rgba(238,27,36,0.08)]"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-[12px] font-black text-[#333]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-100% border border-[#e3e3e3] bg-white rounded-[18px] py-3.5 px-4 text-[14px] outline-none transition-all focus:border-[#ee1b24] focus:shadow-[0_0_0_4px_rgba(238,27,36,0.08)]"
                />
              </div>
              <div className="grid gap-1.5 col-span-2 max-[680px]:col-span-1">
                <label className="text-[12px] font-black text-[#333]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-100% border border-[#e3e3e3] bg-white rounded-[18px] py-3.5 px-4 text-[14px] outline-none transition-all focus:border-[#ee1b24] focus:shadow-[0_0_0_4px_rgba(238,27,36,0.08)]"
                />
              </div>
              <div className="grid gap-1.5 col-span-2 max-[680px]:col-span-1">
                <label className="text-[12px] font-black text-[#333]">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Business partnership / White label"
                  className="w-100% border border-[#e3e3e3] bg-white rounded-[18px] py-3.5 px-4 text-[14px] outline-none transition-all focus:border-[#ee1b24] focus:shadow-[0_0_0_4px_rgba(238,27,36,0.08)]"
                />
              </div>
              <div className="grid gap-1.5 col-span-2 max-[680px]:col-span-1">
                <label className="text-[12px] font-black text-[#333]">
                  Message
                </label>
                <textarea
                  maxLength={250}
                  placeholder="Tell us about your business, target market, and connectivity needs."
                  className="w-100% border border-[#e3e3e3] bg-white rounded-[18px] py-3.5 px-4 text-[14px] outline-none transition-all focus:border-[#ee1b24] focus:shadow-[0_0_0_4px_rgba(238,27,36,0.08)] min-h-[145px] resize-y"
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-3.5 mt-4.5">
              <small className="text-[#777]">0/250</small>
              <button
                className="inline-flex items-center justify-center gap-2.5 rounded-full py-[15px] px-6 font-black text-[14px] whitespace-nowrap cursor-pointer transition-all duration-200 ease bg-[#ee1b24] text-white hover:bg-[#d91620] hover:-translate-y-0.5 border-0"
                style={{ boxShadow: "0 14px 32px rgba(238,27,36,.25)" }}
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
