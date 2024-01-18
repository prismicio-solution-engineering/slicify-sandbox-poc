import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TeamSlice`.
 */
export type TeamSliceProps = SliceComponentProps<Content.TeamSliceSlice>;

/**
 * Component for "TeamSlice" Slices.
 */
const TeamSlice = ({ slice }: TeamSliceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="
          text-center text-3xl font-semibold text-gray-800
          mb-16
          font-sans
        ">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="flex flex-wrap -mx-4 justify-center">
            {slice.items.map((member, index) => (
              <div key={index} className="
              px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-10
            ">
                <div className="
                flex flex-col items-center overflow-hidden
                bg-[#ffffff] rounded-lg shadow-lg
                p-6 border border-[#f0eee3]
              ">
                  <PrismicNextImage className="
                    mb-6 w-24 h-24 rounded-full object-cover 
                    border-2 border-white"
                    field={member.picture} />
                  <h2 className="
                  text-xl font-semibold text-gray-800 mb-1 
                  font-sans
                ">
                    {member.name}
                  </h2>
                  <p className="
                  text-sm text-gray-600 mb-3
                  font-sans
                ">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default TeamSlice;
