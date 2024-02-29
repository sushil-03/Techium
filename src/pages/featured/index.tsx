import FeaturedPost from "@/components/posts/FeaturedPost";
import PageLayout from "../_layout";
import RecommendedPost from "@/components/posts/RecommendedPost";
import EmailCard from "@/components/cards/EmailCard";
import { useFetchPost } from "@/hooks/query/getPost";
import { FilterStoreType, useFilterStore } from "@/hooks/state/filter";
import { useFetchHomeData } from "@/hooks/query/getHomePageData";
import parser from "html-react-parser";
const FeaturedArticle = () => {
  const debounceText = useFilterStore((state: FilterStoreType) => state.search);
  const limit = useFilterStore((state: FilterStoreType) => state.limit);
  const page = useFilterStore((state: FilterStoreType) => state.page);
  const company = useFilterStore((state: FilterStoreType) => state.company);
  const category = useFilterStore((state: FilterStoreType) => state.category);
  const country = useFilterStore((state: FilterStoreType) => state.country);

  const { data } = useFetchPost({
    limit: limit,
    page: page || 1,
    company: company || "",
    category: category || "",
    search: debounceText || "",
  });

  const { data: homeData } = useFetchHomeData();

  return (
    <PageLayout>
      <div className="w-full h-full pt-20">
        <div className="w-11/12 h-full mx-auto  md:w-10/12 overflow-hidden">
          {/* header */}
          {homeData ? (
            <div className="flex flex-col w-full gap-0 pt-24 xl:flex-row lg:gap-10 md:gap-6 sm:gap-4 dark:text-textColor-dark text-textColor-light">
              <div className="w-full  xl:w-1/2 text-brand-primary">
                <div className="md:text-5xl sm:text-4xl text-3xl font-gt-super-ds-trial lg:text-6xl lg:leading-16 leading-12 w-2/3 capitalize">
                  Explore 4,424 <br /> Case Studies
                </div>
                <div className="w-full mt-6 md:text-xl sm:text-lg  text-md leading-7  font-gt-walsheim-light md:w-4/5 sm:w-3/4  whitespace-pre-line	">
                  {parser(homeData.description.html)}
                </div>
              </div>
              <div className="flex-1 w-full ">
                <EmailCard
                  hero_image={homeData.hero_image}
                  case_studies={homeData.face_title}
                  faces={homeData.faces}
                />
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          {/* Featured Post */}
          <div></div>
          <FeaturedPost />
          {/* Recommended Post */}
          <div className="w-full">
            {data ? <RecommendedPost posts={data} /> : <div>Loading....</div>}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FeaturedArticle;
