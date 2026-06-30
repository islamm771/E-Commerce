import Image from "next/image"

interface IProps {
  member: {
    id: number,
    name: string,
    image: string,
    role: string
  }
}



const TeamMember = ({ member }: IProps) => {
  return (
    <div className="text-center">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          width={350}
          height={350}
          className="w-full h-150 object-cover"
        />
      </div>

      <h3 className="text-xl font-semibold mt-6">
        {member.name}
      </h3>

      <p className="text-gray-500">
        {member.role}
      </p>
    </div>
  )
}

export default TeamMember