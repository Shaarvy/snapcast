import SharedHeader from '@/components/SharedHeader';
import VideoCard from '@/components/VideoCard';
import { dummyCards } from '@/constants';


const Page = async ({params} : ParamsWithSearch) => {
    const { id } = await params;
    return (
        <div className="wrapper page">
            <SharedHeader subHeader="shaarvy@username.pro" title="Shaarvy" userImg="/assets/images/dummy.jpg" />

            <section className="video-grid">
                {dummyCards.map((card) => (
                    <VideoCard key={card.id} {...card} />
                ))}
            </section>
        </div>
    );
};

export default Page;