import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuthAdmin } from '../hooks/useAuthAdmin';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Save, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const PasswordPolicy: React.FC = () => {
  const { toast } = useToast();
  const { usePasswordPolicy, useUpdatePasswordPolicy } = useAuthAdmin();
  const { data: policy, isLoading } = usePasswordPolicy();
  const updatePolicy = useUpdatePasswordPolicy();

  const [formData, setFormData] = useState({
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90
  });

  useEffect(() => {
    if (policy) {
      setFormData(policy);
    }
  }, [policy]);

  const handleSave = () => {
    updatePolicy.mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Policy Updated",
          description: "Password policy rules have been successfully applied.",
          variant: "default"
        });
      },
      onError: () => {
        toast({
          title: "Update Failed",
          description: "Could not apply password policy. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader><CardTitle>Password Policy</CardTitle></CardHeader>
        <CardContent className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Global Password Policy
        </CardTitle>
        <CardDescription>Enforce strict complexity requirements across the platform.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 items-center">
          <Label htmlFor="minLength" className="text-sm font-medium">Minimum Length</Label>
          <Input 
            id="minLength" 
            type="number" 
            min={8} max={128} 
            value={formData.minLength}
            onChange={(e) => setFormData({...formData, minLength: parseInt(e.target.value)})}
            className="w-24"
          />
        </div>
        
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Require Uppercase</Label>
            <p className="text-xs text-muted-foreground">Must contain at least one uppercase letter (A-Z)</p>
          </div>
          <Switch 
            checked={formData.requireUppercase}
            onCheckedChange={(c) => setFormData({...formData, requireUppercase: c})}
          />
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Require Numbers</Label>
            <p className="text-xs text-muted-foreground">Must contain at least one digit (0-9)</p>
          </div>
          <Switch 
            checked={formData.requireNumbers}
            onCheckedChange={(c) => setFormData({...formData, requireNumbers: c})}
          />
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Require Special Characters</Label>
            <p className="text-xs text-muted-foreground">Must contain at least one special char (!@#$%^&*)</p>
          </div>
          <Switch 
            checked={formData.requireSpecialChars}
            onCheckedChange={(c) => setFormData({...formData, requireSpecialChars: c})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="space-y-0.5">
            <Label htmlFor="expiry" className="text-sm font-medium">Password Expiry (Days)</Label>
            <p className="text-xs text-muted-foreground">Force reset after X days (0 to disable)</p>
          </div>
          <Input 
            id="expiry" 
            type="number" 
            min={0} max={365} 
            value={formData.expiryDays}
            onChange={(e) => setFormData({...formData, expiryDays: parseInt(e.target.value)})}
            className="w-24 ml-auto"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSave} 
          disabled={updatePolicy.isPending}
          className="w-full"
        >
          {updatePolicy.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Policy Configuration
        </Button>
      </CardFooter>
    </Card>
  );
};
