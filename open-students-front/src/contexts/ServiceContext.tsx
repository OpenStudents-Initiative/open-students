import { AuthService } from "@/services/authService";
import { PeriodService } from "@/services/periodService";
import { ProfessorService } from "@/services/professorService";
import { ReviewService } from "@/services/reviewService";
import React, { useContext } from "react";

type ServiceProviderProps = {
  authService: AuthService;
  periodService: PeriodService;
  professorService: ProfessorService;
  reviewService: ReviewService;
  children: React.ReactNode;
};

type ServiceContext = Omit<ServiceProviderProps, "children">;

const ServiceContext = React.createContext<ServiceContext | null>(null);

function createServiceHook<T extends keyof ServiceContext>(service: T) {
  return () => {
    const currentContext = useContext(ServiceContext);
    if (!currentContext) {
      throw new Error(
        `context error: ${service} wasn't given in the current ServiceContext`,
      );
    }
    return currentContext[service] as ServiceContext[T];
  };
}

export const useAuthService = createServiceHook("authService");
export const usePeriodService = createServiceHook("periodService");
export const useProfessorService = createServiceHook("professorService");
export const useReviewService = createServiceHook("reviewService");

export function ServiceProvider({
  authService,
  periodService,
  professorService,
  reviewService,
  children,
}: ServiceProviderProps) {
  return (
    <ServiceContext.Provider
      value={{ authService, periodService, professorService, reviewService }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
