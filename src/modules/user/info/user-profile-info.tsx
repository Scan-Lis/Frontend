import { RolesDB, RolesLabels } from "@/types/types";

interface Props {
  className?: string;
  role: RolesDB;
  name: string;
}

const RoleColors = {
  [RolesDB.ROLE_ADMIN]: "text-green-600 bg-green-600/40",
  [RolesDB.ROLE_AUXILIAR]: "text-dark-blue bg-light-blue/40",
};

const UserProfileInfo = ({ className = "", role, name }: Props) => {
  return (
    <section className={`flex gap-4 h-fit ${className}`}>
      <div className="flex flex-col items-end text-dark-gray font-semibold">
        <h3>{name}</h3>
        <p
          className={`text-[.8rem] w-fit py-1 px-3 rounded-full text-center ${RoleColors[role]}`}
        >
          {RolesLabels[role]}
        </p>
      </div>
      <div className="h-fit p-3 rounded-md bg-gradient-profile">
        <img src="/assets/logo.svg" alt="Logo lis" />
      </div>
    </section>
  );
};

export default UserProfileInfo;
