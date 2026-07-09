import { Request, Response } from 'express';
import { rbacService } from '../services/rbac/rbac.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class RBACController {
  
  // Permissions
  public createPermission = catchAsync(async (req: Request, res: Response) => {
    const { name, description, module } = req.body;
    const result = await rbacService.createPermission(name, description, module);
    res.status(201).json(new ApiResponse(201, result, 'Permission created'));
  });

  public getPermissions = catchAsync(async (req: Request, res: Response) => {
    const result = await rbacService.getPermissions();
    res.status(200).json(new ApiResponse(200, result, 'Permissions retrieved'));
  });

  public deletePermission = catchAsync(async (req: Request, res: Response) => {
    await rbacService.deletePermission(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Permission deleted'));
  });

  // Roles
  public createRole = catchAsync(async (req: Request, res: Response) => {
    const { name, description, permissions } = req.body;
    const result = await rbacService.createRole(name, description, permissions);
    res.status(201).json(new ApiResponse(201, result, 'Role created'));
  });

  public getRoles = catchAsync(async (req: Request, res: Response) => {
    const result = await rbacService.getRoles();
    res.status(200).json(new ApiResponse(200, result, 'Roles retrieved'));
  });

  public updateRole = catchAsync(async (req: Request, res: Response) => {
    const { permissions } = req.body;
    const result = await rbacService.updateRolePermissions(req.params.id, permissions);
    res.status(200).json(new ApiResponse(200, result, 'Role permissions updated'));
  });

  public deleteRole = catchAsync(async (req: Request, res: Response) => {
    await rbacService.deleteRole(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Role deleted'));
  });

  // User Assignments
  public assignRoles = catchAsync(async (req: Request, res: Response) => {
    const { roles } = req.body;
    const result = await rbacService.assignRolesToUser(req.params.userId, roles);
    res.status(200).json(new ApiResponse(200, result, 'User roles updated'));
  });

  public removeRole = catchAsync(async (req: Request, res: Response) => {
    const result = await rbacService.removeRoleFromUser(req.params.userId, req.params.roleId);
    res.status(200).json(new ApiResponse(200, result, 'Role removed from user'));
  });

  public getUserMatrix = catchAsync(async (req: Request, res: Response) => {
    const result = await rbacService.getUserMatrix();
    res.status(200).json(new ApiResponse(200, result, 'User matrix retrieved'));
  });
}

export const rbacController = new RBACController();
