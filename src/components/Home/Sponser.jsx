import { IMAGES } from "../../assets/Images";
import AnimatedContent from "../gsap/AnimatedContent";
import TeamCarousel from "../lightswind/team-carousel";


const logos = [
  {
    id: "1",
    name: "",
    role: "",
    image: IMAGES.HABBALOGO, // make sure this is correct
  },
  {
    id: "2",
    name: "",
    role: "",
    image: IMAGES.GALLERY1, // make sure this is correct
  },
  {
    id: "3",
    name: "",
    role: "",
    image: IMAGES.GALLERY12, // make sure this is correct
  },
  {
    id: "4",
    name: "",
    role: "",
    image: IMAGES.GALLERY7, // make sure this is correct
  },
  {
    id: "5",
    name: "",
    role: "",
    image: IMAGES.GALLERY9, // make sure this is correct
  },
];

export default function Sponsor() {
  return (
<div className="w-full py-32">
<AnimatedContent distance={70} direction="vertical" reverse={false} duration={1}  ease="power3.out"  initialOpacity={0} animateOpacity  scale={1}  threshold={0.2}  delay={0.3}>
      <TeamCarousel
  members={[
    { id: "1", image: IMAGES.HABBALOGO },
    { id: "2", image: IMAGES.HABBALOGO },
    { id: "3", image: IMAGES.HABBALOGO },
    { id: "4", image: IMAGES.HABBALOGO },
    { id: "5", image: IMAGES.HABBALOGO },
  ]}
  autoPlay={2500}
  visibleCards={5}
/>
      </AnimatedContent>
    </div>
  );
}
