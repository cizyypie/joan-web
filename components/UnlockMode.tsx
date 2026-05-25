"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unlockModeContent } from "@/data/content";
import { getAuthUser, loginUser } from "@/lib/api";
  
gsap.registerPlugin(ScrollTrigger);

// Types
type FormStatus = "idle" | "loading" | "success" | "error";

export default function UnlockMode() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!username.trim() || !password.trim()) {
    setStatus("error");
    setMessage("Please fill in both fields.");
    shakeCard();
    return;
  }

  setStatus("loading");
  setMessage("");

  try {
    const loginData = await loginUser(username, password);

    localStorage.setItem("accessToken", loginData.accessToken);
    localStorage.setItem("refreshToken", loginData.refreshToken);

    const authUser = await getAuthUser(loginData.accessToken);

    setStatus("success");
    setMessage(`RAW Mode Unlocked. Verified as ${authUser.firstName}.`);
  } catch (err) {
    setStatus("error");

    if (err && typeof err === "object" && "message" in err) {
      setMessage(String(err.message));
    } else {
      setMessage("Network error. Please try again.");
    }

    shakeCard();
  }
};

  // Shake animation on error
  const shakeCard = () => {
    gsap.fromTo(
      formCardRef.current,
      { x: 0 },
      {
        x: -6,
        duration: 0.07,
        ease: "power1.inOut",
        repeat: 5, 
        yoyo: true, 
        onComplete: () => {
          gsap.set(formCardRef.current, { x: 0 });
        },
      },
    );
  };

  // Reset form
  const handleReset = () => {
  setStatus("idle");
  setMessage("");
  setUsername("");
  setPassword("");
  setShowPassword(false);
};

  // ScrollTrigger reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtextRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        formCardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (status !== "success") return;

    gsap.fromTo(
      formCardRef.current,
      {
        scale: 0.96,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  }, [status]);

  return (
    <section
      id="unlock"
      ref={sectionRef}
      className="
        w-full bg-white
        py-24 md:py-32
        border-t border-black/10
      "
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex flex-col gap-6">  {/*left*/}
            <p
              className="text-xs font-mono font-medium tracking-widest uppercase text-black/40 "
            >
              {unlockModeContent.label}
            </p>

            <h2
              ref={headlineRef}
              className="
                text-3xl md:text-4xl lg:text-4xl
                font-bold tracking-tight text-black
                leading-tight uppercase
              "
            >
              {unlockModeContent.headline}
            </h2>

            <p
              ref={subtextRef}
              className="text-base text-black/55 max-w-sm leading-relaxed"
            >
              {unlockModeContent.subtext}
            </p>

            {/* Tech note */}
            <p
              className="
              text-xs text-black/35
              border-l-2 border-black/15
              pl-3 max-w-xs leading-relaxed
            "
            >
              {unlockModeContent.technote}
            </p>
          </div>

          {/* RIGHT*/}
          <div ref={formCardRef}>
            <div className="border border-black/15 p-8">
              {(status === "idle" || status === "loading") && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="username"
                      className="text-xs font-medium text-black/60 tracking-wide"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={status === "loading"}
                      className="
                        w-full px-4 py-3
                        border border-black/20
                        text-sm text-black
                        placeholder:text-black/25
                        focus:outline-none
                        focus:border-black
                        disabled:opacity-40
                        transition-colors duration-200
                        bg-white
                      "
                    />
                  </div>

                  {/* Password field */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="password"
                      className="text-xs font-medium text-black/60 tracking-wide"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={status === "loading"}
                        className="
                          w-full px-4 py-3 pr-12
                          border border-black/20
                          text-sm text-black
                          placeholder:text-black/25
                          focus:outline-none
                          focus:border-black
                          disabled:opacity-40
                          transition-colors duration-200
                          bg-white
                        "
                      />
                      {/* Show/hide password toggle */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="
                          absolute right-3 top-1/2 -translate-y-1/2
                          text-black/30 hover:text-black
                          transition-colors duration-200
                          text-xs font-mono
                        "
                      >
                        {showPassword ? "hide" : "show"}
                      </button>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="
                      w-full py-3
                      bg-black text-white
                      text-sm font-medium
                      hover:bg-black/80
                      disabled:opacity-60
                      transition-all duration-200
                      flex items-center justify-center gap-2
                    "
                  >
                    {status === "loading" ? (
                      <>
                        {/* Loading spinner — pure CSS */}
                        <span
                          className="
                          w-4 h-4
                          border-2 border-white/30
                          border-t-white
                          rounded-full
                          animate-spin
                        "
                        />
                        Unlocking...
                      </>
                    ) : (
                      <>
                        Unlock
                        <span>⬡</span>
                      </>
                    )}
                  </button>

                  {/* Powered by note */}
                  <p className="text-xs text-black/30 text-center">
                    {unlockModeContent.poweredby}
                  </p>
                </form>
              )}

              {/* SUCCESS state */}
              {status === "success" && (
                <div
                  className="
                  relative overflow-hidden
                  bg-black text-white
                  border border-white/10
                  p-8 md:p-10
                "
                >
                  {/* animated glow */}
                  <div
                    className="
                    absolute inset-0
                    opacity-20
                    pointer-events-none
                  "
                  >
                    <div
                      className="
                      absolute -top-24 -left-24
                      w-72 h-72
                      bg-white/10 blur-3xl
                      rounded-full
                    "
                    />
                  </div>

                  <div className="relative z-10 flex flex-col gap-6">
                    <div
                      className="
                      inline-flex items-center gap-2
                      text-xs tracking-[0.3em]
                      text-white/40
                    "
                    >
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      RAW MODE UNLOCKED
                    </div>

                    <div
                      className="text-4xl md:text-3xl font-bold tracking-tight leading-none">
                      ACCESS GRANTED
                    </div>

                    <p
                      className="text-white/65  max-w-md leading-relaxed "
                    >
                     {message}
                    </p>

                    <div
                      className="
                      border border-white/10
                      bg-white/[0.03]
                      p-4 font-mono text-sm
                      text-white/70
                      flex flex-col gap-2
                    "
                    >
                      <p>{">"} Initializing interface...</p>
                      <p>{">"} Connecting frontend to API...</p>
                      <p>{">"} Welcome back!</p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="
                        w-fit px-5 py-2.5
                        border border-white/15
                        text-sm
                        hover:bg-white hover:text-black
                        transition-all duration-300
                      "
                    >
                      Reset Session
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR state */}
              {status === "error" && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3 p-4 border border-black/20">
                    <div
                      className="
                      w-8 h-8 flex-shrink-0
                      border border-black/20
                      rounded-full
                      flex items-center justify-center
                      text-sm
                    "
                    >
                      !
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black mb-0.5">
                        Access failed.
                      </p>
                      <p className="text-xs text-black/55">{message}</p>
                    </div>
                  </div>

                  {/* Try again button */}
                  <button
                    onClick={handleReset}
                    className=" w-full py-3
                      border border-black
                      text-sm font-medium text-black
                      hover:bg-black hover:text-white
                      transition-all duration-200
                    "
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
