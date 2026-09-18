import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import materialSupplyImage from "../../assets/material-supply.avif";
import packersMoversImage from "../../assets/packers-movers.jpeg";
import interiorWorkImage from "../../assets/interior-design.jpg";
import realEstateImage from "../../assets/real-estate.jpg";
import todayTravelsImage from "../../assets/today-travels.avif";

const ServicesOffered = () => {
  const servicesOptions = [
    {
      name: "Material Suppliers",
      image: materialSupplyImage,
      link: "/services?term=Material Suppliers",
      price: 499,
    },
    {
      name: "Packers & Movers",
      image: packersMoversImage,
      link: "/services?term=Packers %26 Movers",
      price: 599,
    },
    {
      name: "Interior Work",
      image: interiorWorkImage,
      link: "/services?term=Interior Work",
      price: 799,
    },
    {
      name: "Today Travels",
      image: todayTravelsImage,
      link: "/services?term=Today Travels",
      price: 199,
    },
    {
      name: "Real Estate",
      image: realEstateImage,
      link: "/services?term=Real Estate",
      price: 555,
    },
  ];

  return (
    <>
      {/* Section 1: Clean, Modern Service Grid (6 items) */}
      <section className="py-12 bg-surface-primary border-t border-border-tertiary">
        <div className="w-full max-w-7xl px-4 md:px-8 mx-auto">
          <div className="text-start mb-12">
            <h2 className="text-3xl md:text-6xl font-bold text-text-primary">
              Browse All <span className="text-text-muted">Categories</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Service Card */}
            {servicesOptions.map((opt, index) => (
              <Link
                key={index}
                to={opt.link}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer block"
              >
                <div className="flex flex-col w-full h-full">
                  <div className="h-2/3 flex items-center justify-center w-full p-3">
                    {opt.image ? (
                      <img
                        src={opt.image}
                        alt={opt.name}
                        className="h-full w-full rounded-xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      opt.icon
                    )}
                  </div>
                  <div className="flex px-3 py-2 items-center justify-between h-1/3 bg-surface-accent">
                    <div>
                      <h3 className="font-semibold">{opt.name}</h3>
                      <p className="text-sm">From ₹ {opt.price}</p>
                    </div>
                    <div className="service-icon-hover border p-1.5 rounded-full border-border-dark group-hover:btn-primary group-hover:text-white transition-colors">
                      <MoveRight size={22} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesOffered;
