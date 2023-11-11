import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export const MentorDetail = () => {
  const { mentor, courses } = useLoaderData();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  
  return (
    <>
    {console.log(mentor)}
      <div className="p-40">
        <div className="flex">
          <div className="w-2/3">
            <div className="text-sm">INSTRUCTOR</div>
            <div className="text-3xl font-medium">{mentor.name}</div>
            <div className="text-xs">{mentor.userRole}</div>
            <div className="flex mt-5">
              <div className="mr-3">
                <div className="text-sm">Total students</div>
                <div className="font-medium text-lg">771,307</div>
              </div>
              <div>
                <div className="text-sm">Reviewers</div>
                <div className="font-medium text-lg">150,178</div>
              </div>
            </div>
            <div className="font-semibold text-xl mt-10">About me</div>
            <div className="font-light mb-5 w-full whitespace-pre-line">{`Hello there! I'm ${mentor.name}, and I'm delighted to welcome you to my corner of the digital world. Here's a little insight into who I am and what makes me tick.

I am a INSTRUCTOR with a passion for ART. My journey in ARTIST began 3 Years ago when I [Briefly Describe How You Started]. Since then, I've had the privilege of working with [Notable Clients/Projects], where I honed my skills and cultivated a deep love for [Specific Aspects of Your Work].

One of the things that excites me the most is [A Particular Interest or Hobby]. Whether it's [Examples of Your Interests], you can often find me [Describe What You Enjoy Doing]. It's in these moments of [Your Interest] that I find inspiration and a sense of balance.

Outside of my professional life, I'm a dedicated [Other Interests or Roles]. [Mention If You Have Any Volunteer Work or Community Involvement]. I believe in giving back to the community and making a positive impact wherever I can.

This blog/website/[Your Platform] is my creative outlet, where I'll be sharing my thoughts, experiences, and insights about [Topics You Plan to Cover]. My goal is to [Your Blog/Website Mission or Purpose].

I'm a firm believer in lifelong learning and growth, so you can expect me to explore new horizons, challenge myself, and share the journey with you. Thank you for joining me on this adventure, and I look forward to connecting with you. Feel free to [Provide Contact Information or Social Media Links] to stay in touch and continue this conversation.

Here's to a world of discovery and connection!

Warm regards,
${mentor.name}`}</div>
            <div className="font-medium">My Courses {`(${courses.length})`}</div>
            <div className="flex w-full">
              <img className="w-1/2 mr-3" src={courses[0].img} />
              <img className="w-1/2" src={courses[1].img} />
            </div>
          </div>
          <div className="w-1/3 px-16">
            <img className="rounded-full w-full" src={`../${mentor.img}`} />
          </div>
        </div>
      </div>
    </>
  );
};
