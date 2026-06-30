import Link from "next/link";
import { Fragment } from "react";

interface IProps {
    /** أجزاء وسيطة بين الـ Home والصفحة الحالية، من غير ما تحط فواصل بنفسك */
    pathes?: string | string[];
    /** اسم الصفحة الحالية (مش لينك) */
    indexPath: string;
}

const PathElement = ({ pathes, indexPath }: IProps) => {
    const segments = pathes ? (Array.isArray(pathes) ? pathes : [pathes]) : [];

    return (
        <nav aria-label="breadcrumb" className="my-8">
            <ol className="flex flex-wrap items-center gap-1 text-gray-400 capitalize">
                <li>
                    <Link href="/" className="hover:text-black transition-colors">
                        Home
                    </Link>
                </li>

                {segments.map((segment, idx) => (
                    <Fragment key={idx}>
                        <li aria-hidden="true">/</li>
                        <li>{segment}</li>
                    </Fragment>
                ))}

                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-black font-medium">
                    {indexPath}
                </li>
            </ol>
        </nav>
    );
};

export default PathElement;