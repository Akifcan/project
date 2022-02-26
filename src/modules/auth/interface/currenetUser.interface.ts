import { UserRole } from "../../user/entites/user.entity"

interface CurrentUserProps {
    id: number
    role: UserRole
}

export default CurrentUserProps