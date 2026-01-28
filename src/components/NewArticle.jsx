import React, { useState } from "react";

const NewArticle = ({ content, Time }) => {
  const [showBanner, setShowBanner] = useState(false);

  const parseContent = (rawText) => {
    const sections = {
      title: "",
      metaDescription: "",
      keyTakeaways: [],
      summary: "",
      whyThisMatters: "",
      keyTerms: [],
      faq: [],
      sources: [],
      tags: [],
      keywords: [],
      internalLinks: [],
    };

    const lines = rawText.split("\n");
    let currentSection = "";

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;

      // Detect section headers
      if (line.startsWith("Title:")) {
        sections.title = line.replace("Title:", "").trim();
        continue;
      }

      if (line.startsWith("Meta Description:")) {
        sections.metaDescription = line.replace("Meta Description:", "").trim();
        continue;
      }

      if (line.startsWith("Key Takeaways:")) {
        currentSection = "keyTakeaways";
        continue;
      }

      if (line.startsWith("Summary")) {
        currentSection = "summary";
        const summaryContent = line.split(":").slice(1).join(":").trim();
        if (summaryContent) {
          sections.summary = summaryContent;
        }
        continue;
      }

      if (line.startsWith("Why This Matters:")) {
        currentSection = "whyThisMatters";
        const content = line.split(":").slice(1).join(":").trim();
        if (content) {
          sections.whyThisMatters = content;
        }
        continue;
      }

      if (line.startsWith("Key Terms")) {
        currentSection = "keyTerms";
        continue;
      }

      if (line.startsWith("FAQ")) {
        currentSection = "faq";
        continue;
      }

      if (line.startsWith("Sources")) {
        currentSection = "sources";
        continue;
      }

      if (line.startsWith("Related Tags")) {
        currentSection = "tags";
        const match = line.match(/Related Tags\s*\([^)]*\):\s*(.+)/i);
        if (match && match[1].trim()) {
          sections.tags = match[1].trim().split(",").map(t => t.trim());
        } else {
          let nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
          if (nextLine) {
            sections.tags = nextLine.split(",").map(t => t.trim());
            i++;
          }
        }
        continue;
      }

      if (line.startsWith("Target Keywords")) {
        currentSection = "keywords";
        const match = line.match(/Target Keywords\s*\([^)]*\):\s*(.+)/i);
        if (match && match[1].trim()) {
          sections.keywords = match[1].trim().split(",").map(k => k.trim());
        } else {
          let nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
          if (nextLine) {
            sections.keywords = nextLine.split(",").map(k => k.trim());
            i++;
          }
        }
        continue;
      }

      if (line.startsWith("Internal Link Suggestions")) {
        currentSection = "internalLinks";
        continue;
      }

      // Process content
      if (currentSection === "keyTakeaways" && line.startsWith("*")) {
        sections.keyTakeaways.push(line.replace("*", "").trim());
      } else if (currentSection === "summary") {
        sections.summary += (sections.summary ? " " : "") + line;
      } else if (currentSection === "whyThisMatters") {
        sections.whyThisMatters += (sections.whyThisMatters ? " " : "") + line;
      } else if (currentSection === "keyTerms") {
        const colonIndex = line.indexOf(":");
        if (colonIndex > -1) {
          const term = line.substring(0, colonIndex).trim();
          const definition = line.substring(colonIndex + 1).trim();
          if (term && definition) {
            const cleanTerm = term.replace(/\*\*/g, '');
            sections.keyTerms.push({ term: cleanTerm, definition });
          }
        }
      } else if (currentSection === "faq") {
        if (line.startsWith("Q:")) {
          sections.faq.push({
            question: line.replace("Q:", "").trim(),
            answer: "",
          });
        } else if (line.startsWith("A:")) {
          if (sections.faq.length > 0) {
            sections.faq[sections.faq.length - 1].answer = line.replace("A:", "").trim();
          }
        }
      } else if (currentSection === "sources") {
        if (line && !line.includes("Sources") && !line.includes("Related Tags")) {
          sections.sources.push(line.trim());
        }
      } else if (currentSection === "internalLinks" && line.startsWith("*")) {
        sections.internalLinks.push(line.replace("*", "").trim());
      }
    }

    return sections;
  };

  const parsedContent = parseContent(content);

  const FakeBanner = () => (
    <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-6 mb-8 shadow-xl">
      <button
        onClick={() => setShowBanner(false)}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white mb-2">
            Upgrade Your Learning Experience
          </h3>
          <p className="text-white/90 mb-4">
            Get unlimited access to all premium content and advanced features.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Try Premium Free for 30 Days
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Container */}
        <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white px-6 py-12 sm:p-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
               
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  {Time.slice(0, 10)}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                {parsedContent.title}
              </h1>
              
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg">10 min read</span>
                </div>
              </div>
            </div>
            
        
          </div>

          {/* Main Content */}
          <div className="px-6 py-12 sm:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content - 3 columns */}
              <div className="lg:col-span-3 space-y-16">
                {/* Meta Description Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Article Overview</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {parsedContent.metaDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Banner */}
                {showBanner && <FakeBanner />}

                {/* Key Takeaways */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Key Takeaways</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {parsedContent.keyTakeaways.map((takeaway, index) => (
                      <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <p className="text-gray-800 leading-relaxed">
                            {takeaway.split("**").map((part, i) =>
                              i % 2 === 1 ? (
                                <strong key={i} className="text-gray-900">
                                  {part}
                                </strong>
                              ) : (
                                part
                              ),
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Summary */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Summary</h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {parsedContent.summary.split(". ").map((sentence, index, array) => (
                          <span key={index}>
                            {index === 0 && (
                              <span className="text-4xl font-bold text-gray-400 float-left mr-3 mt-1">
                                {sentence.charAt(0)}
                              </span>
                            )}
                            {sentence.slice(1)}
                            {index < array.length - 1 ? ". " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Why This Matters */}
                <section>
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-12">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <h2 className="text-3xl font-bold">Why This Matters</h2>
                      </div>
                      <p className="text-gray-200 text-xl leading-relaxed">
                        {parsedContent.whyThisMatters}
                      </p>
                    </div>
                 
                  </div>
                </section>

                {/* FAQ Section */}
                {parsedContent.faq.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Frequently Asked Questions
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {parsedContent.faq.map((item, index) => (
                        <div
                          key={index}
                          className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold">
                              Q
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {item.question}
                              </h3>
                              <div className="flex items-start gap-4 mt-4 pt-4 border-t border-gray-100">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold">
                                  A
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar - 1 column */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Key Terms */}
                  {parsedContent.keyTerms.length > 0 && (
                    <section className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Key Terms</h3>
                      </div>
                      <div className="space-y-5">
                        {parsedContent.keyTerms.map((term, index) => (
                          <div
                            key={index}
                            className="pb-5 border-b border-gray-100 last:border-0 last:pb-0"
                          >
                            <h4 className="font-bold text-gray-900 mb-2 text-lg">
                              {term.term}
                            </h4>
                            <p className="text-gray-700 text-sm">{term.definition}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Tags */}
                  {parsedContent.tags.length > 0 && (
                    <section className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Related Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {parsedContent.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 text-sm font-medium rounded-full border border-gray-200 hover:border-blue-300 hover:from-blue-50 hover:to-blue-100 transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Keywords */}
                  {parsedContent.keywords.length > 0 && (
                    <section className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Target Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {parsedContent.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Internal Links */}
                  {parsedContent.internalLinks.length > 0 && (
                    <section className="bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Explore More</h3>
                      </div>
                      <ul className="space-y-4">
                        {parsedContent.internalLinks.map((link, index) => (
                          <li key={index} className="group">
                            <a
                              href="#"
                              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium group-hover:underline">{link}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              </div>
            </div>

            {/* Sources Section */}
            {parsedContent.sources.length > 0 && (
              <section className="mt-16 pt-12 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">References & Sources</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parsedContent.sources.map((source, index) => (
                    <div
                      key={index}
                      className="group bg-gray-50 hover:bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                    >
                      <a
                        href={source}
                        className="flex items-start gap-3 text-gray-700 hover:text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-400 group-hover:text-white">
                          <span className="font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-sm break-all">{source}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

       
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewArticle;