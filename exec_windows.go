//go:build windows

package main

import (
	"os/exec"
	"syscall"
)

func prepareHiddenCommand(cmd *exec.Cmd) {
	if cmd.SysProcAttr == nil {
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	cmd.SysProcAttr.HideWindow = true
}
