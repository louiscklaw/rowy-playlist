import { ReactNode, useState } from "react";

import {
  useTheme,
  useMediaQuery,
  Dialog,
  DialogProps,
  Stack,
  DialogTitle,
  Typography,
  IconButton,
  MobileStepper,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { SlideTransitionMui } from "@src/components/Modal/SlideTransition";
import ScrollableDialogContent from "@src/components/Modal/ScrollableDialogContent";

export interface IWizardDialogProps extends DialogProps {
  title: string;
  steps: {
    title: string;
    description?: ReactNode;
    content: ReactNode;
    disableNext?: boolean;
  }[];
  onFinish: () => void;
  fullHeight?: boolean;
}

export default function WizardDialog({
  title,
  steps,
  onFinish,
  fullHeight = true,
  ...props
}: IWizardDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const handleNext = () =>
    step < steps.length - 1 ? setStep((s) => s + 1) : onFinish();
  const handleBack = () =>
    step > 0 ? setStep((s) => s - 1) : props.onClose?.({}, "escapeKeyDown");

  return (
    <Dialog
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={isMobile ? Slide : SlideTransitionMui}
      TransitionProps={isMobile ? ({ direction: "up" } as any) : undefined}
      aria-labelledby="wizard-title"
      aria-describedby="wizard-step-description"
      maxWidth="md"
      {...props}
      sx={
        fullHeight
          ? {
              ...props.sx,
              "& .MuiDialog-paper": {
                height: "100%",
                ...props.sx?.["& .MuiDialog-paper"],
              },
            }
          : props.sx
      }
    >
      <Stack
        direction={isMobile ? "column-reverse" : "row"}
        alignItems={isMobile ? "flex-end" : "flex-start"}
      >
        <DialogTitle
          id="wizard-title"
          sx={{
            flexGrow: 1,
            flexShrink: isMobile ? 0 : 1,
            userSelect: "none",
            pt: isMobile ? { xs: 0 } : undefined,
            mt: isMobile ? -1.5 : 0,
            width: isMobile ? "100%" : undefined,
          }}
        >
          {title}
          {currentStep.title && `: ${currentStep.title}`}
        </DialogTitle>

        <Stack
          direction="row"
          alignItems="flex-start"
          style={{ flexShrink: 0 }}
        >
          <MobileStepper
            variant="dots"
            position="static"
            steps={steps.length}
            activeStep={step}
            sx={{
              p: 0,
              m: { xs: 1, sm: 1.5 },
              background: "none",

              "& .MuiMobileStepper-dot": { mx: 0.5 },
            }}
            nextButton={
              <IconButton
                aria-label="Next"
                onClick={handleNext}
                disabled={currentStep.disableNext}
              >
                <ChevronRightIcon />
              </IconButton>
            }
            backButton={
              <IconButton
                aria-label="Back"
                onClick={handleBack}
                disabled={step <= 0}
              >
                <ChevronLeftIcon />
              </IconButton>
            }
          />

          <IconButton
            onClick={props.onClose as any}
            aria-label="Close"
            sx={{
              m: { xs: 1, sm: 1.5 },
              ml: { xs: -1, sm: -1 },
            }}
            className="dialog-close"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Stack>

      <ScrollableDialogContent>
        {currentStep.description && (
          <Typography
            variant="body1"
            id="wizard-step-description"
            component={
              typeof currentStep.description === "string" ? "p" : "div"
            }
            paragraph
          >
            {currentStep.description}
          </Typography>
        )}

        {currentStep.content}
      </ScrollableDialogContent>

      <DialogActions>
        <Button onClick={handleBack}>{step > 0 ? "Back" : "Cancel"}</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={currentStep.disableNext}
        >
          {step === steps.length - 1 ? "Finish" : "Continue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
