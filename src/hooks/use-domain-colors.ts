/**
 * Resolves the theme-appropriate signal colors for rover status and incident
 * severity. Signals are darkened in the light scheme to hold contrast, so the
 * mapping must follow the active scheme rather than being a static constant.
 */

import { RoverStatusColorByScheme, SeverityColorByScheme } from '@/constants/domain';
import { useThemeContext } from '@/contexts/theme-context';

export function useDomainColors() {
  const { scheme } = useThemeContext();
  return {
    roverStatus: RoverStatusColorByScheme[scheme],
    severity: SeverityColorByScheme[scheme],
  };
}
