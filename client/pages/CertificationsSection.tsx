import React, { useState } from "react";
import "./CertificationsSection.css";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function CertificationsSection() {
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const certifications = [
    {
      id: 1,
      title: "ISO/IEC 27001:2022",
      subtitle: "Information Security Management System",
      image: "/iso-27001-certificate-thumb.png",
      pdf: "/iso-27001-certificate.pdf",
      description:
        "Axisphere Mediaworx LLP is ISO/IEC 27001:2022 certified, demonstrating our strong commitment to protecting information security and maintaining confidentiality, integrity, and availability of data.",
    },
    {
      id: 2,
      title: "ISO 9001:2015",
      subtitle: "Quality Management System",
      image: "/iso-9001-certificate-thumb.png",
      pdf: "/iso-9001-certificate.pdf",
      description:
        "Our ISO 9001:2015 certification showcases Axisphere’s dedication to continuous improvement, customer satisfaction, and delivering quality-driven services across all operations.",
    },
  ];

  const toggleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <section id="certifications" className={`cert-section py-24 text-center ${darkMode ? 'bg-luxury-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto mb-6">
          <div className="text-left">
            <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Our Certifications</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
              Axisphere Mediaworx LLP is recognized globally for its commitment to quality,
              security, and excellence through internationally accredited standards.
            </p>
          </div>

          <div className="ml-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setDarkMode((s) => !s)}
              aria-pressed={darkMode}
              aria-label="Toggle certifications theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 justify-center items-center">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="card-wrapper perspective"
              onClick={() => toggleFlip(cert.id)}
            >
              <div
                className={`flip-card-inner ${flippedId === cert.id ? "flipped" : ""}`}
              >
                {/* Front Side */}
                <div className="flip-card-front bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-80 h-96 object-contain rounded-lg"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">
                    {cert.title}
                  </h3>
                </div>

                {/* Back Side */}
                <div className="flip-card-back bg-white rounded-2xl shadow-xl p-8 text-center flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold text-gray-800">{cert.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{cert.subtitle}</p>
                  <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 shadow-md transition-all duration-300"
                  >
                    View Certification
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
