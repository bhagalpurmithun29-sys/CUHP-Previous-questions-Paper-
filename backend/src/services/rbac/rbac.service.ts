import { Role, IRole } from '../../models/role.model';
import { Permission, IPermission } from '../../models/permission.model';
import { User } from '../../models/user.model';
import { AppError } from '../../utils/AppError';

export class RBACService {
  
  // ============================
  // PERMISSION MANAGEMENT
  // ============================

  public async createPermission(name: string, description: string, module: string) {
    const existing = await Permission.findOne({ name: name.toUpperCase() });
    if (existing) throw new AppError('Permission already exists', 400);

    return await Permission.create({ name: name.toUpperCase(), description, module });
  }

  public async getPermissions() {
    return await Permission.find().sort({ module: 1, name: 1 });
  }

  public async deletePermission(id: string) {
    // Check if any role uses this permission
    const isUsed = await Role.exists({ permissions: id });
    if (isUsed) throw new AppError('Cannot delete permission as it is assigned to one or more roles', 400);
    
    return await Permission.findByIdAndDelete(id);
  }

  // ============================
  // ROLE MANAGEMENT
  // ============================

  public async createRole(name: string, description: string, permissionIds: string[] = []) {
    const existing = await Role.findOne({ name: name.toUpperCase() });
    if (existing) throw new AppError('Role already exists', 400);

    return await Role.create({ 
      name: name.toUpperCase(), 
      description, 
      permissions: permissionIds 
    });
  }

  public async getRoles() {
    return await Role.find().populate('permissions');
  }

  public async updateRolePermissions(roleId: string, permissionIds: string[]) {
    const role = await Role.findById(roleId);
    if (!role) throw new AppError('Role not found', 404);

    role.permissions = permissionIds as any;
    await role.save();
    return await role.populate('permissions');
  }

  public async deleteRole(id: string) {
    const role = await Role.findById(id);
    if (!role) throw new AppError('Role not found', 404);
    if (role.isSystem) throw new AppError('Cannot delete a system role', 403);

    // Remove this role from all users
    await User.updateMany(
      { dynamicRoles: id },
      { $pull: { dynamicRoles: id } }
    );

    return await Role.findByIdAndDelete(id);
  }

  // ============================
  // USER ROLE MANAGEMENT
  // ============================

  public async assignRolesToUser(userId: string, roleIds: string[]) {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    // Using Set to prevent duplicates, merging with existing if wanted, 
    // but usually assign implies overriding or we explicitly add.
    // Let's replace the dynamicRoles array for clean sync:
    user.dynamicRoles = roleIds as any;
    
    // Auto-sync legacy string enum if appropriate (simplified logic)
    // In production, we'd find the highest hierarchy role
    
    await user.save();
    return user;
  }

  public async removeRoleFromUser(userId: string, roleId: string) {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { dynamicRoles: roleId } },
      { new: true }
    );
  }

  public async getUserMatrix() {
    // Returns a list of users and their assigned roles for the Admin UI matrix
    return await User.find({ status: 'ACTIVE' })
      .select('firstName lastName email role dynamicRoles')
      .populate({
        path: 'dynamicRoles',
        select: 'name'
      })
      .limit(100); // Pagination in real world
  }
}

export const rbacService = new RBACService();
