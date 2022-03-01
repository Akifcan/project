import { UserRole } from "../../user/entites/user.entity"

interface CurrentUserProps {
    id: number
    role: UserRole
    email: string
}

export default CurrentUserProps