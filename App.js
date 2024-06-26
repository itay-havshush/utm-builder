import React, { useState } from "react";

const UTMGenerator = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [useBitly, setUseBitly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateUrl = async () => {
    setIsLoading(true);
    const utm = new URLSearchParams({
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
      utm_content: content,
    }).toString();

    let fullUrl = `${baseUrl}?${utm}`;

    if (source === "sms" && useBitly) {
      // Simulate API call to Bitly
      await new Promise((resolve) => setTimeout(resolve, 1000));
      fullUrl = `https://bit.ly/${Math.random().toString(36).substr(2, 6)}`;
    }

    setGeneratedUrl(fullUrl);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>UTM URL Generator</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Base URL"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          style={{ padding: "5px" }}
        />
        <select
          onChange={(e) => {
            setSource(e.target.value);
            if (e.target.value !== "sms") setUseBitly(false);
          }}
          style={{ padding: "5px" }}
        >
          <option value="">Select Source (Channel)</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="facebook">Facebook</option>
          <option value="google">Google</option>
        </select>
        {source === "sms" && (
          <div>
            <label>
              <input
                type="radio"
                name="bitly"
                value="true"
                checked={useBitly}
                onChange={() => setUseBitly(true)}
              />{" "}
              Make it a Bitly
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="bitly"
                value="false"
                checked={!useBitly}
                onChange={() => setUseBitly(false)}
              />{" "}
              Use full URL
            </label>
          </div>
        )}
        <select
          onChange={(e) => setMedium(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">Select Medium</option>
          <option value="crm">CRM</option>
          <option value="social">Social</option>
          <option value="cpc">CPC</option>
        </select>
        <select
          onChange={(e) => setCampaign(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">Select Campaign</option>
          <option value="summer2024">Summer 2024</option>
          <option value="fall2024">Fall 2024</option>
        </select>
        <select
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">Select Content (Promotion)</option>
          <option value="50off">50% Off</option>
          <option value="free-shipping">Free Shipping</option>
        </select>
        <button
          onClick={generateUrl}
          disabled={isLoading}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Generating..." : "Generate URL"}
        </button>
        {generatedUrl && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "bold" }}>Generated URL:</p>
            <p
              style={{
                wordBreak: "break-all",
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {generatedUrl}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UTMGenerator;
