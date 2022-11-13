import { useState, useEffect, createElement } from 'react';
import { usePopper } from 'react-popper';
import { grey } from './colors';
import ArrowUpIcon from './img/ArrowUp';
import ArrowDownIcon from './img/ArrowDown';
import ArrowLeftIcon from './img/ArrowLeft';
import ArrowRightIcon from './img/ArrowRight';
import TrashIcon from './img/Trash';
import TextIcon from './img/Text';
import MultiIcon from './img/Multi';
import HashIcon from './img/Hash';
import PlusIcon from './img/Plus';
import { ACTION_TYPES, DATA_TYPES, shortId } from './utils';


function getPropertyIcon(dataType: any) {
  switch (dataType) {
    case DATA_TYPES.NUMBER:
      return <HashIcon/>;
    case DATA_TYPES.TEXT:
      return <TextIcon/>;
    case DATA_TYPES.SELECT:
      return <MultiIcon/>;
    default:
      return null;
  }
}

export default function Header({
                                 column: { id, created, label, dataType, getResizerProps, getHeaderProps },
                                 setSortBy,
                                 dataDispatch
                               }) {
  const [expanded, setExpanded] = useState(created || false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [inputRef, setInputRef] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    strategy: 'absolute'
  });
  const [header, setHeader] = useState(label);
  const [typeReferenceElement, setTypeReferenceElement] = useState(null);
  const [typePopperElement, setTypePopperElement] = useState(null);
  const typePopper = usePopper(typeReferenceElement, typePopperElement, {
    placement: 'right',
    strategy: 'fixed'
  });
  const [showType, setShowType] = useState(false);
  const buttons = [
    {
      onClick: (e: any) => {
        dataDispatch({
          type: ACTION_TYPES.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header
        });
        setSortBy([{ id: id, desc: false }]);
        setExpanded(false);
      },
      icon: <ArrowUpIcon/>,
      label: 'Sort ascending'
    },
    {
      onClick: (e: any) => {
        dataDispatch({
          type: ACTION_TYPES.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header
        });
        setSortBy([{ id: id, desc: true }]);
        setExpanded(false);
      },
      icon: <ArrowDownIcon/>,
      label: 'Sort descending'
    },
    {
      onClick: (e: any) => {
        dataDispatch({
          type: ACTION_TYPES.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header
        });
        dataDispatch({
          type: ACTION_TYPES.ADD_COLUMN_TO_LEFT,
          columnId: id,
          focus: false
        });
        setExpanded(false);
      },
      icon: <ArrowLeftIcon/>,
      label: 'Insert left'
    },
    {
      onClick: (e: any) => {
        dataDispatch({
          type: ACTION_TYPES.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header
        });
        dataDispatch({
          type: ACTION_TYPES.ADD_COLUMN_TO_RIGHT,
          columnId: id,
          focus: false
        });
        setExpanded(false);
      },
      icon: <ArrowRightIcon/>,
      label: 'Insert right'
    },
    {
      onClick: (e: any) => {
        dataDispatch({
          type: ACTION_TYPES.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header
        });
        dataDispatch({ type: ACTION_TYPES.DELETE_COLUMN, columnId: id });
        setExpanded(false);
      },
      icon: <TrashIcon/>,
      label: 'Delete'
    }
  ];
  const propertyIcon = getPropertyIcon(dataType);

  const types = [
    {
      onClick: (e: any) => {
        dataDispatch({
          type: 'update_column_type',
          columnId: id,
          dataType: DATA_TYPES.SELECT
        });
        setShowType(false);
        setExpanded(false);
      },
      icon: <MultiIcon/>,
      label: 'Select'
    },
    {
      onClick: (e: any) => {
        dataDispatch({
          type: 'update_column_type',
          columnId: id,
          dataType: DATA_TYPES.TEXT
        });
        setShowType(false);
        setExpanded(false);
      },
      icon: <TextIcon/>,
      label: 'Text'
    },
    {
      onClick: (e: any) => {
        dataDispatch({
          type: 'update_column_type',
          columnId: id,
          dataType: DATA_TYPES.NUMBER
        });
        setShowType(false);
        setExpanded(false);
      },
      icon: <HashIcon/>,
      label: 'Number'
    }
  ];


  function handleKeyDown(e: { key: string; }) {
    if (e.key === 'Enter') {
      dataDispatch({
        type: 'update_column_header',
        columnId: id,
        label: header
      });
      setExpanded(false);
    }
  }

  function handleChange(e: { target: { value: any; }; }) {
    setHeader(e.target.value);
  }

  function handleBlur(e: { preventDefault: () => void; }) {
    e.preventDefault();
    dataDispatch({ type: 'update_column_header', columnId: id, label: header });
  }

  function getHeader() {
    if (id !== 999999) {
      return (
          <>
            <div key={crypto.randomUUID()} {...getHeaderProps()} className="th noselect d-inline-block">
              <div
                  className="th-content"
                  onClick={() => setExpanded(true)}
                  ref={setReferenceElement}
              >
              <span className="svg-icon svg-gray icon-margin">
                {propertyIcon}
              </span>
                {label}
              </div>
              <div {...getResizerProps()} className="resizer"/>
            </div>
            {expanded && (
                <div key={crypto.randomUUID()} className="overlay" onClick={() => setExpanded(false)}/>
            )}
            {expanded && (
                <div key={crypto.randomUUID()}
                     ref={setPopperElement}
                     style={{ ...styles.popper, zIndex: 3 }}
                     {...attributes.popper}
                >
                  <div
                      className="bg-white shadow-5 border-radius-md"
                      style={{
                        width: 240
                      }}
                  >
                    <div
                        style={{
                          paddingTop: '0.75rem',
                          paddingLeft: '0.75rem',
                          paddingRight: '0.75rem'
                        }}
                    >
                      <div className="is-fullwidth" style={{ marginBottom: 12 }}>
                        <input
                            className="form-input"
                            ref={setInputRef}
                            type="text"
                            value={header}
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                        />
                      </div>
                      <span className="font-weight-600 font-size-75 color-grey-500 text-transform-uppercase">
                    Property Type
                  </span>
                    </div>
                    <div className="list-padding">
                      <button
                          className="sort-button"
                          type="button"
                          onMouseEnter={() => setShowType(true)}
                          onMouseLeave={() => setShowType(false)}
                          ref={setTypeReferenceElement}
                      >
                    <span className="svg-icon svg-text icon-margin">
                      {propertyIcon}
                    </span>
                        <span className="text-transform-capitalize">
                      {dataType}
                    </span>
                      </button>
                      {showType && (
                          <div
                              className="shadow-5 bg-white border-radius-md list-padding"
                              ref={setTypePopperElement}
                              onMouseEnter={() => setShowType(true)}
                              onMouseLeave={() => setShowType(false)}
                              {...typePopper.attributes.popper}
                              style={{
                                ...typePopper.styles.popper,
                                width: 200,
                                backgroundColor: 'white',
                                zIndex: 4
                              }}
                          >
                            {types.map(type => (
                                <button key={type.label} className="sort-button" onClick={type.onClick}>
                          <span className="svg-icon svg-text icon-margin">
                            {type.icon}
                          </span>
                                  {type.label}
                                </button>
                            ))}
                          </div>
                      )}
                    </div>
                    <div
                        className="list-padding"
                        key={shortId()}
                        style={{
                          borderTop: `2px solid ${grey(200)}`
                        }}
                    >
                      {buttons.map(button => (
                          <button
                              key={button.label}
                              type="button"
                              className="sort-button"
                              onMouseDown={button.onClick}
                          >
                      <span className="svg-icon svg-text icon-margin">
                        {button.icon}
                      </span>
                            {button.label}
                          </button>
                      ))}
                    </div>
                  </div>
                </div>
            )}
          </>
      );
    }

    return (
        <div {...getHeaderProps()} key={crypto.randomUUID()} className="th noselect d-inline-block">
          <div
              className="th-content d-flex justify-content-center"
              onClick={e =>
                  dataDispatch({
                    type: 'add_column_to_left',
                    columnId: 999999,
                    focus: true
                  })
              }
          >
          <span className="svg-icon-sm svg-gray">
            <PlusIcon/>
          </span>
          </div>
        </div>
    );
  }

  useEffect(() => {
    if (created) {
      setExpanded(true);
    }
  }, [created]);

  useEffect(() => {
    setHeader(label);
  }, [label]);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  return getHeader();
}
