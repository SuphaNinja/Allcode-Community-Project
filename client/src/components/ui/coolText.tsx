import { Link } from "react-router-dom";

const produceSpans = (text:string, animation: any) => {
    return text.split("").map((letter, index) => (
        <span
            key={index}
            className={`bg-gradient-to-b from-pink-600  to-purple-600 bg-clip-text text-3xl tracking-tight text-transparent inline-block transform-style-3d origin-bottom ${animation}`}
            style={{ animationDelay: `${index * 0.25}s` }}
        >
            {letter === " " ? "\u00A0" : letter}
        </span>
    ));
};

interface PositionProps {
    text1: string;
    text2: string;
    to?: string;
}

const Position = ({ text1, text2, to}: PositionProps) => {
    return (
        <div className="relative cursor-default font-medium text-white text-[16px] xs:text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[66px] leading-[32px] 2xl:leading-[40px] w-full flex justify-center items-center">
            <div className="absolute flex flex-col items-center">
                {to ? (
                    <Link
                        to={to}
                        className="absolute  left-1/2 transform -translate-x-1/2 top-[10%] sm:top-[8%] md:top-[5%] lg:top-[3%] 2xl:top-0 flex justify-center"
                    >
                        {produceSpans(text1, "animate-textRotate1")}
                    </Link>
                ) : (
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 top-[10%] sm:top-[8%] md:top-[5%] lg:top-[3%] 2xl:top-0 flex justify-center"
                    >
                        {produceSpans(text1, "animate-textRotate1")}
                    </div>
                )}

                {to ? (
                    <Link
                        to={to}
                        className="absolute hover:underline custom-underline left-1/2 transform -translate-x-1/2 top-[25%] sm:top-[22%] md:top-[18%] lg:top-[15%] 2xl:top-[10%] flex justify-center"
                    >
                        {produceSpans(text2, "animate-textRotate2")}
                    </Link>
                ) : (
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 top-[25%] sm:top-[22%] md:top-[18%] lg:top-[15%] 2xl:top-[10%] flex justify-center"
                    >
                        {produceSpans(text2, "animate-textRotate2")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Position;