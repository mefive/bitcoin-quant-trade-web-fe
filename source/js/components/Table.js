import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';

import 'styles/components/table.scss';

class Table extends Component {
  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    expandedRowRender: PropTypes.func,
    rowSelection: PropTypes.object,
    rowKey: PropTypes.string
  }

  static defaultProps = {
    rowClassName: () => null
  }

  constructor(props) {
    super(props);

    this.state = {
      columnsWidth: {},
      rowsState: {}
    };
  }

  componentDidMount() {
    if (this.props)
    this.resizeHeader();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.columns !== this.props.columns) {
      this.resizeHeader();
    }
  }

  resizeHeader() {
    const { columnsWidth } = this.state;
    const { fixHeader } = this.props;

    if (!fixHeader) {
      return;
    }

    const { head } = this.refs;

    const thList = head.querySelectorAll('th') || [];

    [].forEach.call(
      thList, 
      (th, index) => columnsWidth[index] = th.clientWidth
    );

    this.setState({ columnsWidth });
  }

  getRowKey(record, recordIndex) {
    const { rowKey } = this.props;

    return rowKey ? record[rowKey] : recordIndex;
  }

  getRows() {
    const {
      dataSource = [],
      columns,
      expandedRowRender,
      rowSelection,
      rowKey
    } = this.props;

    const { rowsState } = this.state;
    const columnsLength = columns.length;

    const rows = [];

    dataSource.forEach((record, recordIndex) => {
      const rowState = rowsState[`${recordIndex}`];
      const key = this.getRowKey(record, recordIndex)

      const row = (
        <tr
          key={key}
          className={classNames(
            'row-container',
            this.props.rowClassName(record),
            { 'expanded': rowState && rowState.expanded }
          )}
        >
        {rowSelection && (
          <td
            key="row-select"
            className="row-select"
          >
            <input
              type="checkbox"
              checked={rowSelection.selectedRowKeys
                && rowSelection.selectedRowKeys.indexOf(key) !== -1
              }
              onChange={e => {
                const { checked } = e.target;

                const newSelectedRowKeys = [...rowSelection.selectedRowKeys];

                if (checked) {
                  newSelectedRowKeys.push(key);
                }
                else {
                  remove(newSelectedRowKeys, i => i === key);
                }

                rowSelection.onChange(newSelectedRowKeys);
              }}
            />
          </td>
        )}

        {columns.map((column, columnIndex) => (
          <td
            key={columnIndex}
            style={{
              textAlign: column.align
                ? column.align : null,
              paddingLeft: column.align === 'center' ? 0 : 20,
              paddingRight: column.align === 'center' ? 0 : 20
            }}
            data-key={column.key}
          >
            {isFunction(column.render)
              ? column.render(record, recordIndex)
              : record[column.key]
            }
          </td>
        ))}

        {isFunction(expandedRowRender) && (
          <td
            key="detail-trigger"
            className="detail-trigger-cell"
            onClick={() => {
              if (rowState == null) {
                rowsState[`${recordIndex}`] = {
                  expanded: true
                };
              }
              else {
                rowState.expanded = !rowState.expanded;
              }

              this.setState({ rowsState });
            }}
          >
            <i className="icon icon-caret-down"></i>
          </td>
        )}
        </tr>
      );

      rows.push(row);

      if (expandedRowRender && rowState && rowState.expanded) {
        let colSpan = columnsLength + 1;

        if (rowSelection) {
          colSpan = colSpan + 1;
        }

        const detailRow = (
          <tr
            key={`${recordIndex}_detail`}
          >
            <td colSpan={colSpan}>
              {expandedRowRender(record)}
            </td>
          </tr>
        );

        rows.push(detailRow);
      }
    });

    return rows;
  }

  render() {
    const {
      className,
      columns = [],
      dataSource,
      fixHeader,
      expandedRowRender,
      rowSelection,
      rowKey
    } = this.props;

    const { columnsWidth } = this.state;

    return (
      <div
        className={classNames(
          'table',
          { [className]: !!className }
        )}
      >
        <table cellPadding="0" cellSpacing="0">
          <colgroup>
          {rowSelection && (
            <col key="row-select" width={50} />
          )}

          {columns.map((i, index) => (
            <col key={index} width={i.width || null}/>     
          ))}

          {isFunction(expandedRowRender) && (
            <col key="detail-trigger" width={50} />
          )}
          </colgroup>
          <thead ref="head">
            <tr>
            {rowSelection && (
              <th
                key="row-select"
                className="row-select"
              >
                <input
                  type="checkbox"
                  checked={(() => {
                    let checked = true;

                    dataSource.forEach((record, recordIndex) => {
                      const key = this.getRowKey(record, recordIndex);

                      if (rowSelection
                        .selectedRowKeys.indexOf(key) === -1
                      ) {
                        checked = false;
                        return false;
                      }
                    });

                    return checked;
                  })()}
                  onChange={e => {
                    const { checked } = e.target;

                    if (checked) {
                      rowSelection.onChange(
                        dataSource.map(
                          (record, recordIndex) => 
                            this.getRowKey(record, recordIndex)
                        )
                      );
                    }
                    else {
                      rowSelection.onChange([]);
                    }
                  }}
                />
              </th>
            )}

            {columns.map((column, index) => (
              <th
                data-key={column.key}
                data-column
                key={index}
                style={{
                  textAlign: column.align ? column.align : null,
                  paddingLeft: column.align === 'center' ? 0 : 20,
                  paddingRight: column.align === 'center' ? 0 : 20
                }}
              >
                {column.title}
              </th>
            ))}

            {isFunction(expandedRowRender) && (
              <th
                key="detail-trigger"
              />
            )}
            </tr>
          </thead>

          {dataSource != null && dataSource.length > 0 && (
          <tbody>
            {this.getRows()}
          </tbody>
          )}
        </table>

        {dataSource == null && (
        <div className="loading">
          <div>
            加载中...
          </div>
        </div> 
        )}

        {dataSource && dataSource.length === 0 && (
        <div className="loading">
          <div>
            没有数据
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default Table;
