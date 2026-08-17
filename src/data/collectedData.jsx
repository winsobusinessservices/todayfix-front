import JMM_LOGO from "../assets/jmm_logo.png";
import JMM_BG from "../assets/jmm_bg.jpeg";
import KTT_LOGO from "../assets/ktt_logo.png";
import KTT_BG from "../assets/ktt_bg.avif";
import DK_LOGO from "../assets/dkk_logo.png";
import DK_BG from "../assets/dk_bg.avif";

export const servicesData = [
  {
    id: 1,
    name: "Digital Media",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
        <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"></path>
      </svg>
    ),
    link: "/digital-media",
  },
  {
    id: 2,
    name: "Engineering Work",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"></path>
        <path d="m18 15 4-4"></path>
        <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"></path>
      </svg>
    ),
    link: "/engineering-work",
  },
  {
    id: 3,
    name: "Packers & Movers",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
        <path d="M15 18H9"></path>
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
        <circle cx="17" cy="18" r="2"></circle>
        <circle cx="7" cy="18" r="2"></circle>
      </svg>
    ),
    link: "/packers-&-movers",
  },
  {
    id: 4,
    name: "Pest Control",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    link: "/pest-control",
  },
  {
    id: 5,
    name: "Interior Work",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="m14.622 17.897-10.68-2.913"></path>
        <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"></path>
        <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"></path>
      </svg>
    ),
    link: "/interior-work",
  },
  {
    id: 6,
    name: "Real Estate",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      </svg>
    ),
    link: "/real-estate",
  },
  {
    id: 7,
    name: "Tours & Travels",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
      </svg>
    ),
    link: "/tours-&-travels",
  },
  {
    id: 8,
    name: "Building Materials",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
        <path d="m7 16.5-4.74-2.85"></path>
        <path d="m7 16.5 5-3"></path>
        <path d="M7 16.5v5.17"></path>
        <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
        <path d="m17 16.5-5-3"></path>
        <path d="m17 16.5 4.74-2.85"></path>
        <path d="M17 16.5v5.17"></path>
        <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
        <path d="M12 8 7.26 5.15"></path>
        <path d="m12 8 4.74-2.85"></path>
        <path d="M12 13.5V8"></path>
      </svg>
    ),
    link: "/building-materials",
  },
  {
    id: 9,
    name: "Solar Services",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    ),
    link: "/solar-service",
  },
  {
    id: 10,
    name: "Electrical Services",
    icon: (
      <svg
        className="h-8 w-8 md:h-10 md:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
      </svg>
    ),
    link: "/electrical-service",
  },
  {
    id: 11,
    name: "Fabrication",
    icon: (
      <svg
        fill="#000000"
        viewBox="0 0 512 512"
        enableBackground="new 0 0 512 512"
        id="Screw_x5F_bolts"
        version="1.1"
        stroke="#000000"
        strokeWidth="6.656000000000001"
        className="h-10 w-10"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="Screw_x5F_bolts_1_">
            <g>
              <g>
                <polygon points="138.573,282.717 176.131,217.665 138.573,152.612 63.458,152.612 49.143,177.407 59.535,183.407 70.386,164.612 131.646,164.612 162.275,217.665 131.646,270.717 70.386,270.717 39.756,217.665 51.883,196.661 41.49,190.661 25.9,217.665 63.458,282.717 "></polygon>{" "}
                <path d="M101.019,251.988c18.926,0,34.324-15.397,34.324-34.324s-15.398-34.324-34.324-34.324s-34.324,15.398-34.324,34.324 S82.092,251.988,101.019,251.988z M123.343,217.665c0,9.611-6.105,17.823-14.642,20.961c-8.703-3.19-14.648-11.576-14.648-20.961 s5.945-17.771,14.646-20.962C117.236,199.84,123.343,208.053,123.343,217.665z M86.612,200.63 c-2.913,5.076-4.559,10.917-4.559,17.034c0,6.119,1.647,11.96,4.56,17.036c-4.839-4.098-7.919-10.212-7.919-17.035 S81.774,204.729,86.612,200.63z"></path>{" "}
              </g>
              <g>
                <path d="M81.052,299.589l-54.346,72.332l35.469,83.231l89.814,10.898l54.346-72.332l-35.469-83.23L81.052,299.589z M146.558,453.304l-76.059-9.229L40.462,373.59l46.022-61.254l76.059,9.23l30.036,70.483L146.558,453.304z"></path>{" "}
                <path d="M131.723,345.059c-10.087-4.059-21.15-3.947-31.151,0.316c-10.002,4.262-17.746,12.164-21.804,22.25 c-4.059,10.087-3.946,21.15,0.316,31.152c4.262,10.002,12.164,17.745,22.25,21.803c4.914,1.979,10.058,2.965,15.2,2.965 c5.413,0,10.822-1.094,15.951-3.28c10.002-4.263,17.746-12.164,21.804-22.251c4.059-10.086,3.946-21.148-0.316-31.15 S141.81,349.117,131.723,345.059z M105.276,356.414c3.618-1.541,7.432-2.313,11.249-2.313c3.625,0,7.254,0.695,10.719,2.09 c2.683,1.08,5.146,2.529,7.336,4.295c-8.627-2.26-17.977-1.711-26.662,1.984c-8.761,3.736-15.675,10.169-20.011,18.057 c0.232-2.854,0.894-5.689,1.993-8.422C92.762,364.992,98.223,359.42,105.276,356.414z M143.157,393.535 c-2.862,7.112-8.323,12.685-15.376,15.69c-7.054,3.005-14.856,3.085-21.967,0.223c-4.289-1.726-8.011-4.401-10.955-7.796 c-0.519-12.148,6.445-23.316,17.761-28.141c11.253-4.787,24.067-2.135,32.488,6.566 C145.548,384.603,144.902,389.197,143.157,393.535z"></path>{" "}
              </g>
              <path d="M281.482,268.558l7.862-2.325l-3.401-11.507l-4.461,1.318v-14.176l7.862-2.325l-3.401-11.508l-4.461,1.319v-14.177 l7.862-2.325l-3.401-11.508l-4.461,1.319v-13.994l8.482-2.508l-3.401-11.508l-5.081,1.502v-14.177l8.482-2.508l-3.401-11.508 l-5.081,1.502v-14.177l8.482-2.508l-3.401-11.508l-5.081,1.502v-9.413h34.34V45.949H171.045v67.411h34.339v31.911l-8.483,2.508 l3.402,11.508l5.081-1.502v14.177l-8.483,2.508l3.402,11.508l5.081-1.502v14.177l-8.483,2.508l3.402,11.508l5.081-1.502v13.994 l-9.103,2.691l3.402,11.508l5.7-1.686v14.177l-9.103,2.691l3.402,11.508l5.7-1.686v14.178l-9.103,2.691l3.402,11.508l5.7-1.686 v17.129h76.099V268.558z M183.045,101.36V57.949h120.777v43.411h-22.34h-76.099H183.045z M217.384,113.36h52.099v12.96 l-52.099,15.403V113.36z M217.384,154.238l52.099-15.403v14.177l-52.099,15.403V154.238z M217.384,180.929l52.099-15.403v14.177 l-52.099,15.403V180.929z M217.384,207.62l52.099-15.403v13.994l-52.099,15.404V207.62z M217.384,234.127l52.099-15.403V232.9 l-52.099,15.403V234.127z M217.384,260.817l52.099-15.403v14.178l-52.099,15.402V260.817z M217.384,296.186v-8.677l52.099-15.403 v24.08H217.384z"></path>{" "}
              <path d="M438.434,338.701l47.666-47.667L383.727,188.662l-47.667,47.667l24.282,24.281l-22.565,22.564l-7.771-4.225l-5.73,10.543 l4.653,2.53l-10.025,10.026l-7.772-4.226l-5.73,10.543l4.654,2.53l-10.024,10.025l-7.772-4.226l-5.73,10.543l4.654,2.53 l-9.896,9.896l-8.339-4.534l-5.731,10.543l5.223,2.84l-10.025,10.024l-8.339-4.533l-5.731,10.543l5.222,2.839l-10.024,10.024 l-8.339-4.533l-5.731,10.543l5.222,2.839l-12.111,12.111l53.81,53.811l28.021-28.021l7.203,3.916l5.73-10.543l-4.086-2.222 l10.025-10.025l7.204,3.916l5.729-10.543l-4.085-2.221l10.024-10.025l7.204,3.916l5.73-10.543l-4.086-2.221l9.896-9.896 l7.771,4.226l5.731-10.543l-4.654-2.53l10.024-10.025l7.772,4.226l5.729-10.543l-4.654-2.53l10.025-10.025l7.771,4.225 l5.731-10.543l-4.654-2.529l6.655-6.656L438.434,338.701z M383.727,205.632l85.402,85.402l-30.695,30.696l-15.797-15.796l0,0 l-26.905-26.905l-42.701-42.701L383.727,205.632z M276.39,435.211l-36.839-36.84l6.135-6.135l47.731,25.947L276.39,435.211z M302.265,409.336l-47.73-25.947l10.024-10.025l47.731,25.947L302.265,409.336z M321.139,390.463l-47.731-25.947l10.025-10.025 l47.731,25.947L321.139,390.463z M340.012,371.59l-47.731-25.948l9.896-9.896l47.731,25.947L340.012,371.59z M358.756,352.846 l-47.731-25.947l10.024-10.025l47.731,25.947L358.756,352.846z M377.629,333.973l-47.731-25.947l10.025-10.026l47.731,25.948 L377.629,333.973z M396.502,315.1l-47.731-25.949l20.056-20.055l18.42,18.419l18.42,18.42L396.502,315.1z"></path>{" "}
            </g>
          </g>
        </g>
      </svg>
    ),
    link: "/fabrication",
  },
];

export const areasData = [
  { id: 1, name: "MG Road", link: "/mg-road" },
  { id: 2, name: "Cubbon Park", link: "/cubbon-park" },
  { id: 3, name: "Majestic", link: "/majestic" },
  { id: 4, name: "Indiranagar", link: "/indiranagar" },
  { id: 5, name: "Whitefield", link: "/whitefield" },
  { id: 6, name: "KR Puram", link: "/kr-puram" },
  { id: 7, name: "Koramangala", link: "/koramangala" },
  { id: 8, name: "Jayanagar", link: "/jayanagar" },
  { id: 9, name: "HSR Layout", link: "/hsr-layout" },
  { id: 10, name: "BTM Layout", link: "/btm-layout" },
  { id: 11, name: "Hebbal", link: "/hebbal" },
  { id: 12, name: "Yelahanka", link: "/yelahanka" },
  { id: 13, name: "Malleswaram", link: "/malleswaram" },
  { id: 14, name: "Rajajinagar", link: "/rajajinagar" },
  { id: 15, name: "Vijayanagar", link: "/vijayanagar" },
];

export const ratings = [
  "4.5 & above",
  "4.0 & above",
  "3.0 & above",
  "All Ratings",
];

export const citiesData = ["Bengaluru"];

export const faqCategories = [
  "General Information",
  "Booking & Scheduling",
  "Pricing & Payments",
  "Trust & Safety",
  "For Professionals",
];

export const faqData = {
  "General Information": [
    {
      question: "What is TodayFix?",
      answer:
        "TodayFix is a home and business services platform that connects customers with trusted professionals and service providers for a wide range of services. From plumbing and electrical work to cleaning, repairs, and other everyday needs, TodayFix helps you find the right professional near you.",
    },
    {
      question: "What services can I book through TodayFix?",
      answer:
        "TodayFix offers a growing range of services including plumbing, electrical work, AC repair and maintenance, cleaning, painting, appliance services, home maintenance, and more. Available services may vary depending on your location.",
    },
    {
      question: "How does TodayFix work?",
      answer:
        "Simply select the service you need, provide your service location and requirements, and submit a request. TodayFix finds eligible professionals near you and sends them your request. Once a professional accepts it, you can coordinate the service directly through the platform.",
    },
    {
      question: "Can I use TodayFix as both a customer and a professional?",
      answer:
        "Yes. You can use the same TodayFix account to book services as a customer and later apply to become a service professional or business owner. Additional verification is required before you can provide services through the platform.",
    },
  ],

  "Booking & Scheduling": [
    {
      question: "How do I request a service?",
      answer:
        "Choose the service you need, select or add your service address, provide the required details, and submit your service request. Nearby eligible professionals will receive the request based on their service, location, and availability.",
    },
    {
      question: "How quickly can a professional reach me?",
      answer:
        "The response time depends on the service, your location, and the availability of nearby professionals. For urgent requests, TodayFix prioritizes available professionals in your area to help you get a faster response.",
    },
    {
      question: "Can I cancel my service request?",
      answer:
        "Yes. You can cancel a service request as long as it has not reached a stage where cancellation is restricted. Any applicable cancellation rules or charges will be shown before cancellation is confirmed.",
    },
    {
      question: "Can I reschedule my service?",
      answer:
        "If your request supports rescheduling, you can coordinate a new time with the assigned professional through TodayFix. Availability may vary depending on the professional and the requested service.",
    },
    {
      question: "What happens after a professional accepts my request?",
      answer:
        "Once a professional accepts your request, they become assigned to the service. You can view the request status, communicate with the professional, and coordinate the service through TodayFix.",
    },
  ],

  "Pricing & Payments": [
    {
      question: "How is the service price determined?",
      answer:
        "Pricing depends on the type of service, scope of work, materials required, location, and the professional's pricing. TodayFix aims to provide transparent pricing so you understand the expected cost before the service begins.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "TodayFix aims to keep pricing transparent. If additional work or materials are required beyond the original request, the professional should clearly communicate the additional cost before proceeding.",
    },
    {
      question: "Do I have to pay to create a service request?",
      answer:
        "Creating a service request does not necessarily mean you have to pay immediately. Payment requirements depend on the service and the payment flow implemented for that service.",
    },
    {
      question: "How do payments work?",
      answer:
        "Depending on the service, payment can be completed through the payment options supported by TodayFix. Payment status and transaction details are recorded securely through the platform.",
    },
    {
      question:
        "What happens if the final price is different from the estimate?",
      answer:
        "If the scope of work changes or additional materials are required, the professional should explain the reason and additional cost before carrying out the extra work. You can then decide whether to proceed.",
    },
  ],

  "Trust & Safety": [
    {
      question: "Are TodayFix professionals verified?",
      answer:
        "TodayFix requires professionals to complete the applicable verification process before they can provide services through the platform. Verification requirements may differ between individual professionals and registered businesses.",
    },
    {
      question: "How are individual professionals verified?",
      answer:
        "Individual professionals may be required to provide identity and other verification information, such as PAN and supporting documents, before being approved to provide services on TodayFix.",
    },
    {
      question: "How are businesses verified?",
      answer:
        "Registered businesses may be required to provide business information and documents such as GST details, business PAN, registered address, and other information required for verification.",
    },
    {
      question: "Can I see a professional's reviews?",
      answer:
        "Yes. You can view reviews and ratings associated with professionals or businesses on their TodayFix profile. Reviews from completed services help customers make more informed decisions.",
    },
    {
      question: "What should I do if I'm not satisfied with the service?",
      answer:
        "If you're not satisfied, you can contact the professional first to discuss the issue. If the issue cannot be resolved, you can contact TodayFix support so the matter can be reviewed and handled according to the platform's policies.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "TodayFix is designed to protect your personal information and only share the information necessary to provide and manage your requested services. Sensitive information should be handled securely according to TodayFix's privacy and security policies.",
    },
  ],

  "For Professionals": [
    {
      question: "How can I become a TodayFix professional?",
      answer:
        "Create a TodayFix account and choose to become a service professional. You can then select whether you are an individual professional or a registered business and complete the required verification process.",
    },
    {
      question: "Can an individual professional join TodayFix?",
      answer:
        "Yes. Individuals who provide services independently can apply as individual professionals. They will need to complete the required identity and professional verification before receiving service requests.",
    },
    {
      question: "Can my company register on TodayFix?",
      answer:
        "Yes. Registered businesses can create a business profile and complete business verification using the required company information and documents.",
    },
    {
      question: "How do professionals receive service requests?",
      answer:
        "When a customer requests a service, TodayFix can broadcast the request to eligible nearby professionals based on factors such as the service they offer, location, availability, and other platform rules.",
    },
    {
      question: "Can I choose which services I provide?",
      answer:
        "Yes. Professionals can select the services they offer and manage their service offerings through their TodayFix profile.",
    },
    {
      question: "Can I set myself as unavailable?",
      answer:
        "Yes. Professionals can manage their availability through their TodayFix account. Unavailable or busy professionals can be excluded from receiving new service requests.",
    },
    {
      question: "Can I showcase my previous work?",
      answer:
        "Yes. Professionals and businesses can upload images to their TodayFix portfolio to showcase previous work and help customers understand their experience and capabilities.",
    },
    {
      question: "How can I track my earnings?",
      answer:
        "Professionals can view their earnings summary, completed jobs, pending payouts, and total revenue through their TodayFix account. They can also view their payout history.",
    },
    {
      question: "Does TodayFix offer professional subscription plans?",
      answer:
        "TodayFix can offer different subscription plans such as PRO and Enterprise with additional features and benefits. Available plans, pricing, and benefits are displayed on the subscription page.",
    },
  ],
};

export const featuredData = [
  {
    id: 1,
    name: "Jai Maa Modular Interiors",
    category: "Home & Decor",
    service: "Interior Design",
    location: "Bangalore",
    rating: "4.9",
    reviews: "245",
    description:
      "Transforming 2BHK and 3BHK homes with bespoke modular kitchens, living spaces, and wardrobes.",
    bgGradient: "from-zinc-900 to-black",
    bg: JMM_BG,
    logo: JMM_LOGO,
  },
  {
    id: 2,
    name: "Kalavathi Tours & Travels",
    category: "Tours & Travels",
    service: "Corporate Travels",
    location: "Bangalore",
    rating: "4.8",
    reviews: "189",
    description:
      "Reliable Airport Transfers, Corporate Transportation, Executive Travel, Employee Transportation and Event Travel Services.",
    bgGradient: "from-zinc-100 to-white",
    bg: KTT_BG,
    logo: KTT_LOGO,
  },
  {
    id: 3,
    name: "DK Relocation",
    category: "Logistics",
    service: "Packers & Movers",
    location: "Bangalore",
    rating: "5.0",
    reviews: "94",
    description:
      "Professional packing, secure transport & on-time delivery — door to door, anywhere in India. Trusted by 50,000+ families & businesses.",
    bgGradient: "from-zinc-100 to-white",
    bg: DK_BG,
    logo: DK_LOGO,
  },
];

export const featureMarqueeData = [
  "Verified Business",
  "Real Customer Reviews",
  "Quick Quote Requests",
  "Local Trusted Providers",
  "Secure Payments",
  "Instant Matching",
  "Expert Contractors",
  "24/7 Support",
];

export const pricingData = [
  {
    tier: "Standard",
    price: "₹0",
    annualPrice: "₹0",
    originalPrice: "₹1199",
    originalAnnualPrice: "₹11990",
    description: "Perfect for occasional home maintenance and quick fixes.",
    bgColor: "bg-surface-secondary",
    textColor: "text-text-primary",
    borderColor: "border-border-primary",
    plusBg: "bg-surface-dark",
    plusText: "text-text-inverted",
    transformStyle: "[transform:rotateY(180deg)_rotateZ(-4deg)]",
    details: [
      "Access to verified professionals",
      "Standard 24/7 support",
      "Basic job tracking",
      "Email notifications",
    ],
  },
  {
    tier: "Pro",
    price: "₹1499",
    annualPrice: "₹14990",
    originalPrice: "₹2499",
    originalAnnualPrice: "₹24990",
    description: "Ideal for frequent service users needing priority booking.",
    bgColor: "bg-surface-dark",
    textColor: "text-text-inverted",
    borderColor: "border-white/20",
    plusBg: "bg-surface-primary",
    plusText: "text-text-primary",
    transformStyle: "[transform:rotateY(180deg)_rotateZ(6deg)_scale(1.05)]",
    details: [
      "Everything in Standard",
      "Priority booking & matching",
      "Dedicated account manager",
      "Free cancellation & rescheduling",
    ],
  },
  {
    tier: "Enterprise",
    price: "₹2999",
    annualPrice: "₹29990",
    originalPrice: "₹4999",
    originalAnnualPrice: "₹49990",
    description:
      "Ultimate comprehensive coverage for large properties and businesses.",
    bgColor: "bg-zinc-900",
    textColor: "text-text-inverted",
    borderColor: "border-white/10",
    plusBg: "bg-surface-primary",
    plusText: "text-text-primary",
    transformStyle: "[transform:rotateY(180deg)_rotateZ(-4deg)]",
    details: [
      "Everything in Pro",
      "Multiple property management",
      "Customized monthly reports",
      "VIP access to top-rated pros",
    ],
  },
];

export const testimonialData = [
  {
    id: 1,
    quote:
      "TodayFix made finding a reliable professional for my home repairs incredibly easy. I could quickly find someone nearby and get the job done without the usual hassle.",
    name: "Rahul Sharma",
    role: "Homeowner, Bengaluru",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyle&backgroundColor=18181b",
  },
  {
    id: 2,
    quote:
      "I needed an electrician urgently and TodayFix connected me with a professional nearby. The whole process was simple, quick, and completely stress-free.",
    name: "Priya Nair",
    role: "Homeowner, Bengaluru",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=18181b",
  },
  {
    id: 3,
    quote:
      "As a service professional, TodayFix has made it much easier to connect with customers who actually need my services. It is a great way to grow my local business.",
    name: "Arjun Kumar",
    role: "Electrician, Bengaluru",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=18181b",
  },
];

export const vendors = [
  {
    id: 1,
    name: "Aura Spaces",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Aura&backgroundColor=0284c7",
    rating: 4.9,
    reviews: 128,
    location: "Indiranagar, Bengaluru",
    startingPrice: "₹50,000",
    verified: true,
    tags: ["Free Consultation", "Modular Kitchens", "3D Renders"],
    description:
      "Award-winning design firm specializing in modern, minimalist residential spaces.",
  },
  {
    id: 2,
    name: "Elevate Interiors",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Elevate&backgroundColor=059669",
    rating: 4.7,
    reviews: 84,
    location: "Koramangala, Bengaluru",
    startingPrice: "₹35,000",
    verified: true,
    tags: ["Budget Friendly", "Office Spaces", "Turnkey Projects"],
    description:
      "Quick turnaround interior solutions for startups and modern apartments.",
  },
  {
    id: 3,
    name: "Luxe Living Studio",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Luxe&backgroundColor=7c3aed",
    rating: 4.8,
    reviews: 215,
    location: "Whitefield, Bengaluru",
    startingPrice: "₹1,00,000",
    verified: true,
    tags: ["Luxury", "Smart Home Integration", "Vastu Compliant"],
    description:
      "Premium end-to-end interior design with a focus on smart home automation and luxury finishes.",
  },
  {
    id: 4,
    name: "Urban Nest Decor",
    avatar:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Urban&backgroundColor=ea580c",
    rating: 4.5,
    reviews: 42,
    location: "HSR Layout, Bengaluru",
    startingPrice: "₹25,000",
    verified: false,
    tags: ["Renovation", "Painting", "Woodwork"],
    description:
      "Specialists in quick home renovations, custom woodwork, and civil upgrades.",
  },
];
