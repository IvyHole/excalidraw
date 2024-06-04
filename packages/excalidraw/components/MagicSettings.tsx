import { useState } from "react";
import { Dialog } from "./Dialog";
import { TextField } from "./TextField";
import { MagicIcon, OpenAIIcon } from "./icons";
import { FilledButton } from "./FilledButton";
import { CheckboxItem } from "./CheckboxItem";
import { KEYS } from "../keys";
import { useUIAppState } from "../context/ui-appState";
import { InlineIcon } from "./InlineIcon";
import { Paragraph } from "./Paragraph";

import "./MagicSettings.scss";
import TTDDialogTabs from "./TTDDialog/TTDDialogTabs";
import { TTDDialogTab } from "./TTDDialog/TTDDialogTab";

export const MagicSettings = (props: {
  openAIKey: string | null;
  openAIUrl: string | null;
  openAIModel: string | null;
  isPersisted: boolean;
  onChange: (key: string, shouldPersist: boolean,url: string, model: string) => void;
  onConfirm: (key: string, url: string, model: string, shouldPersist: boolean) => void;
  onClose: () => void;
}) => {
  const [keyInputValue, setKeyInputValue] = useState(props.openAIKey || "");
  const [keyInputValueUrl, setKeyInputValueUrl] = useState(props.openAIUrl || "");
  const [keyInputValueModel, setKeyInputValueModel] = useState(props.openAIModel || "");
  const [shouldPersist, setShouldPersist] = useState<boolean>(
    props.isPersisted,
  );

  const appState = useUIAppState();

  const onConfirm = () => {
    props.onConfirm(keyInputValue.trim(),keyInputValueUrl.trim(), keyInputValueModel.trim(), shouldPersist);
  };

  if (appState.openDialog?.name !== "settings") {
    return null;
  }

  return (
    <Dialog
      onCloseRequest={() => {
        props.onClose();
        props.onConfirm(keyInputValue.trim(),keyInputValueUrl.trim(), keyInputValueModel.trim(), shouldPersist);
      }}
      title={
        <div style={{ display: "flex" }}>
          Wireframe to Code (AI){" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.1rem 0.5rem",
              marginLeft: "1rem",
              fontSize: 14,
              borderRadius: "12px",
              background: "var(--color-promo)",
              color: "var(--color-surface-lowest)",
            }}
          >
            Experimental
          </div>
        </div>
      }
      className="MagicSettings"
      autofocus={false}
    >
      {/*  <h2
        style={{
          margin: 0,
          fontSize: "1.25rem",
          paddingLeft: "2.5rem",
        }}
      >
        AI Settings
      </h2> */}
      <TTDDialogTabs dialog="settings" tab={appState.openDialog.tab}>
        {/* <TTDDialogTabTriggers>
          <TTDDialogTabTrigger tab="text-to-diagram">
            <InlineIcon icon={brainIcon} /> Text to diagram
          </TTDDialogTabTrigger>
          <TTDDialogTabTrigger tab="diagram-to-code">
            <InlineIcon icon={MagicIcon} /> Wireframe to code
          </TTDDialogTabTrigger>
        </TTDDialogTabTriggers> */}
        {/* <TTDDialogTab className="ttd-dialog-content" tab="text-to-diagram">
          TODO
        </TTDDialogTab> */}
        <TTDDialogTab
          //  className="ttd-dialog-content"
          tab="diagram-to-code"
        >
          <Paragraph>
            For the diagram-to-code feature we use{" "}
            <InlineIcon icon={OpenAIIcon} />
            OpenAI.
          </Paragraph>
          <Paragraph>
            The browser will not save your API proxy address and API model. The model can be filled in with gpt-4o.
          </Paragraph>
          <TextField
            isRedacted
            value={keyInputValueUrl}
            placeholder="Paste your API proxy here"
            label="OpenAI API proxy"
            onChange={(value) => {
              setKeyInputValueUrl(value);
            }}
            selectOnRender
          />
          <TextField
            isRedacted
            value={keyInputValueModel}
            placeholder="Paste your API model here"
            label="OpenAI API model"
            onChange={(value) => {
              setKeyInputValueModel(value);
            }}
            selectOnRender
          />
          <TextField
            isRedacted
            value={keyInputValue}
            placeholder="Paste your API key here"
            label="OpenAI API key"
            onChange={(value) => {
              setKeyInputValue(value);
            }}
            selectOnRender
          />
          <Paragraph>
            By default, your API token is not persisted anywhere so you'll need
            to insert it again after reload. But, you can persist locally in
            your browser below.
          </Paragraph>

          <CheckboxItem checked={shouldPersist} onChange={setShouldPersist}>
            Persist API key in browser storage
          </CheckboxItem>

          <Paragraph>
            Once API key is set, you can use the <InlineIcon icon={MagicIcon} />{" "}
            tool to wrap your elements in a frame that will then allow you to
            turn it into code. This dialog can be accessed using the{" "}
            <b>AI Settings</b> <InlineIcon icon={OpenAIIcon} />.
          </Paragraph>

          <FilledButton
            className="MagicSettings__confirm"
            size="large"
            label="Confirm"
            onClick={onConfirm}
          />
        </TTDDialogTab>
      </TTDDialogTabs>
    </Dialog>
  );
};
