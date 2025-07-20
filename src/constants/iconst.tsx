import {
  ChatBubbleBottomCenterTextIcon,
  DocumentMagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";

const IconsList = {
  chat: <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />,
  details: <DocumentMagnifyingGlassIcon className="w-4 h-4" />,
  delete: <TrashIcon className="w-4 h-4" />,
  update: <PencilIcon className="w-4 h-4" />,
  assign: <UserPlusIcon className="w-4 h-4" />,
};

export default IconsList;
