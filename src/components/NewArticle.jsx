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
      // Try to get tags from same line
      const match = line.match(/Related Tags\s*\([^)]*\):\s*(.+)/i);
      if (match && match[1].trim()) {
        sections.tags = match[1].trim().split(",").map(t => t.trim());
      } else {
        // Get tags from next line
        let nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
        if (nextLine) {
          sections.tags = nextLine.split(",").map(t => t.trim());
          i++; // Skip the next line since we processed it
        }
      }
      continue;
    }

    if (line.startsWith("Target Keywords")) {
      currentSection = "keywords";
      // Try to get keywords from same line
      const match = line.match(/Target Keywords\s*\([^)]*\):\s*(.+)/i);
      if (match && match[1].trim()) {
        sections.keywords = match[1].trim().split(",").map(k => k.trim());
      } else {
        // Get keywords from next line
        let nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
        if (nextLine) {
          sections.keywords = nextLine.split(",").map(k => k.trim());
          i++; // Skip the next line
        }
      }
      continue;
    }

    if (line.startsWith("Internal Link Suggestions")) {
      currentSection = "internalLinks";
      // Skip processing the header line itself
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
          // Remove ** if present
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

  // Fake banner component
  const FakeBanner = () => (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8 shadow-sm">
      <button
        onClick={() => setShowBanner(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Upgrade Your Learning Experience
          </h3>
          <p className="text-gray-700 mt-1">
            Get unlimited access to all premium content and advanced features.
          </p>
          <button className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm">
            Try Premium Free for 30 Days
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Increased width and padding */}
        {/* Article Header */}
        <header className="mb-16"> {/* Increased margin */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"> {/* Increased font size */}
            {parsedContent.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-12"> {/* Increased gap and margin */}
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-3" /* Increased icon size */
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-lg">{Time}</span> {/* Increased text size */}
            </div>
          </div>

          {/* Featured Banner */}
          {showBanner && <FakeBanner />}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16"> {/* Changed to 4-column layout with larger gap */}
          {/* Main Content - 3/4 width */}
          <div className="lg:col-span-3 space-y-16"> {/* Increased spacing between sections */}
            {/* Meta Description */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-xl mb-12"> {/* Increased padding and border radius */}
              <p className="text-gray-800 italic text-lg leading-relaxed"> {/* Increased text size */}
                {parsedContent.metaDescription}
              </p>
            </div>

            {/* Key Takeaways */}
            <section className="mb-16"> {/* Increased margin */}
              <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200"> {/* Increased font size and spacing */}
                Key Takeaways
              </h2>
              <ul className="space-y-6"> {/* Increased spacing */}
                {parsedContent.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1"> {/* Increased size */}
                      <svg
                        className="w-4 h-4" /* Increased icon size */
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed"> {/* Increased text size */}
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
                  </li>
                ))}
              </ul>
            </section>

            {/* Summary */}
            <section className="mb-16"> {/* Increased margin */}
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Summary</h2> {/* Increased font size */}
              <div className="prose prose-xl max-w-none"> {/* Increased prose size */}
                <p className="text-gray-800 text-lg leading-relaxed mb-8"> {/* Increased text size and spacing */}
                  {parsedContent.summary
                    .split(". ")
                    .map((sentence, index, array) => (
                      <span key={index}>
                        {sentence}
                        {index < array.length - 1 ? ". " : ""}
                      </span>
                    ))}
                </p>
              </div>
            </section>

            {/* Why This Matters */}
            <section className="mb-16"> {/* Increased margin */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-10 rounded-3xl"> {/* Increased padding and border radius */}
                <h2 className="text-3xl font-bold mb-6">Why This Matters</h2> {/* Increased font size */}
                <p className="text-gray-200 text-lg leading-relaxed"> {/* Increased text size */}
                  {parsedContent.whyThisMatters}
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-16"> {/* Increased margin */}
              <h2 className="text-3xl font-bold text-gray-900 mb-8"> {/* Increased font size */}
                Frequently Asked Questions
              </h2>
              <div className="space-y-8"> {/* Increased spacing */}
                {parsedContent.faq.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg" /* Increased padding and border radius */
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4"> {/* Increased font size */}
                      Q: {item.question}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed"> {/* Increased text size */}
                      A: {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - 1/4 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-12 space-y-10"> {/* Increased top spacing and gap */}
              {/* Key Terms */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"> {/* Increased padding and border radius */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6"> {/* Increased font size */}
                  Key Terms
                </h3>
                <div className="space-y-6"> {/* Increased spacing */}
                  {parsedContent.keyTerms.map((term, index) => (
                    <div
                      key={index}
                      className="pb-6 border-b border-gray-100 last:border-0" /* Increased padding */
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-2"> {/* Increased font size */}
                        {term.term}
                      </h4>
                      <p className="text-base text-gray-700">{term.definition}</p> {/* Increased text size */}
                    </div>
                  ))}
                </div>
              </section>

              {/* Tags */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Related Tags
                </h3>
                <div className="flex flex-wrap gap-3"> {/* Increased gap */}
                  {parsedContent.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2.5 bg-gray-100 text-gray-800 text-base font-medium rounded-xl hover:bg-gray-200 transition-colors" /* Increased padding and text size */
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* Keywords */}
              <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Target Keywords
                </h3>
                <div className="flex flex-wrap gap-3">
                  {parsedContent.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-base font-semibold rounded-xl border border-blue-100" /* Increased padding and text size */
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>

              {/* Internal Links */}
             {parsedContent.internalLinks.length > 0 &&  <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Explore More
                </h3>
                <ul className="space-y-5"> {/* Increased spacing */}
                  {parsedContent.internalLinks.map((link, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-4 mt-1.5 text-gray-500 flex-shrink-0" /* Increased size */
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span className="text-gray-800 text-lg font-medium">{link}</span> {/* Increased text size */}
                    </li>
                  ))}
                </ul>
              </section>}
            </div>
          </div>
        </div>

        {/* Sources */}
        <section className="mt-20 pt-12 border-t border-gray-200"> {/* Increased margin and padding */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sources</h2> {/* Increased font size */}
          <div className="space-y-5"> {/* Increased spacing */}
            {parsedContent.sources.map((source, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 text-gray-400 mr-4 mt-1"> {/* Increased size */}
                  <svg
                    className="w-8 h-8" /* Increased size */
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <a
                  href={source}
                  className="text-blue-600 hover:text-blue-800 hover:underline break-all text-lg" /* Increased text size */
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source}
                </a>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default NewArticle;