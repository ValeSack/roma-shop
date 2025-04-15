import React from "react";
import "../css/customTable.css";

export const CustomTable = ({ columns, data, actions = [] }) => {
    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        {actions.length > 0 && <th>Acciones</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                                No hay datos disponibles
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.render
                                            ? col.render(item[col.key])
                                            : typeof item[col.key] === "object" && item[col.key] !== null
                                                ? JSON.stringify(item[col.key])
                                                : item[col.key]}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td>
                                        <div className="table-actions">
                                            {actions.map((action, i) => (
                                                <button
                                                    className="table-button"
                                                    key={i}
                                                    onClick={() => action.onClick(item)}
                                                >
                                                    {action.label}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};